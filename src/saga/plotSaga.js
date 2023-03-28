import { put, takeEvery, call, select,  race, take } from "redux-saga/effects"
import { updateAppParam } from "store/MapFlatsSlice"

const getReportPlotRequest = (state) => state.mapFlats.app_params.report_plot_request
const getReportPlot = (state) => state.mapFlats.app_params.report_plot


const getStatPlotRequest = (state) => state.mapFlats.app_params.stat_plot_request
const getStatPlot = (state) => state.mapFlats.app_params.stat_plot

// export const setPlotdata = payload => ({type: SET_USERS, payload})

const generateReportPlot = (request) => {
    return fetch('https://pyxi.pro/tg-web-app/generate-report-plot', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: request,
            tg_data: window.Telegram.WebApp.initData || null
        })
    })
}


const checkReportPlot = (request) => {
    return fetch('https://pyxi.pro/tg-web-app/check-report-plot', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: request,
            tg_data: window.Telegram.WebApp.initData || null
        })
    })
}


const post_request = (url, request) => {
    return fetch('https://pyxi.pro/tg-web-app/' + url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: request,
            tg_data: window.Telegram.WebApp.initData || null
        })
    })
}

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const reportPlotWorker = function* () {
    yield delay(300)
    const request = yield select(getReportPlotRequest);
    yield console.log(request)
    let data = yield call(generateReportPlot, request)
    let plot_data = yield call(() => new Promise(res => res(data.json())))
    yield console.log(plot_data)
    yield put(updateAppParam({ field: 'report_plot', value: plot_data }))
    yield delay(500)
    const update_request = yield select(getReportPlot)

    if (plot_data.status === 'ready') {
        yield put(updateAppParam({ field: 'report_plot', value: { ...plot_data, status: 'ready' } }))
        return true;
    }
    // yield 1;

    if (plot_data.status === 'pending') {
        for (let i = yield 0; i < 60; yield i++) {
            yield delay(500);
            let data = yield call(checkReportPlot, update_request)
            let plot_data = yield call(() => new Promise(res => res(data.json())))
            yield console.log('retry ' + i)
            if (plot_data.status === 'ready') {
                yield put(updateAppParam({ field: 'report_plot', value: { ...plot_data, status: 'ready' } }))
                return true;
            }
            if (plot_data.status === 'error') {
                yield put(updateAppParam({ field: 'report_plot', value: { status: 'error', id: 0 } }))
                return true;
            }
        }
        yield put(updateAppParam({ field: 'report_plot', value: { status: 'error', id: 0 } }))
    }
    // yield delay(100)




    // yield result = ;
}



const reportPlotWatcher = function* () {
    yield takeEvery('GetReportPlot', function* (...args) {
        try {
            yield race({
                task: call(reportPlotWorker),
                cancel: take('CancelGetReportPlot')
            })
        } catch (e) {
            console.log("Что-то пошло не так");
        }
    })
}



const statPlotWatcher = function* () {
    yield takeEvery('GetStatPlot', function* (...args) {
        try {
            yield race({
                task: call(statPlotWorker),
                cancel: take('CancelStatPlot')
            })
        } catch (e) {
            console.log("Что-то пошло не так");
        }
    })
}




const statPlotWorker = function* () {
    yield put(updateAppParam({ field: 'stat_plot_open', value: true }))
    yield delay(300)
    const request = yield select(getStatPlotRequest);
    yield console.log(request)
    let data = yield call(post_request, 'generate-stat-plot', request)
    let plot_data = yield call(() => new Promise(res => res(data.json())))
    yield console.log(plot_data)



    yield put(updateAppParam({ field: 'stat_plot', value: plot_data }))
    yield delay(500)
    const update_request = yield select(getStatPlot)

    if (plot_data.status === 'ready') {
        yield put(updateAppParam({ field: 'stat_plot', value: { ...plot_data, status: 'ready' } }))
        return true;
    }
    yield 1;

    if (plot_data.status === 'pending') {
        yield delay(2000);
        for (let i = yield 0; i < 30; yield i++) {
            yield delay(1000);
            let data = yield call(post_request, 'check-stat-plot' ,update_request)
            let plot_data = yield call(() => new Promise(res => res(data.json())))
            yield console.log('retry ' + i)
            if (plot_data.status === 'ready') {
                yield put(updateAppParam({ field: 'stat_plot', value: { ...plot_data, status: 'ready' } }))
                return true;
            }
            if (plot_data.status === 'error') {
                yield put(updateAppParam({ field: 'stat_plot', value: { status: 'error', id: 0 } }))
                return true;
            }
        }
        yield put(updateAppParam({ field: 'stat_plot', value: { status: 'error', id: 0 } }))
    }
    yield delay(100)




    // yield result = ;
}



// const reportPlotWatcher = function* () {
//     yield takeLatest('GetReportPlot', reportPlotWorker)
// }


// const cancelReportPlotWatcher = function* () {
//     yield takeLatest('CancelGetReportPlot', reportPlotWorker)
// }


export { reportPlotWatcher, statPlotWatcher };
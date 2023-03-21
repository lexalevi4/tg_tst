import { put, takeEvery, call, select, takeLatest, race, take } from "redux-saga/effects"
import { updateAppParam } from "store/MapFlatsSlice"
const getReportPlotRequest = (state) => state.mapFlats.app_params.report_plot_request
const getReportPlot = (state) => state.mapFlats.app_params.report_plot
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
    if (plot_data.status === 'pending') {
        for (let i = 0; i < 60; i++) {
            yield delay(5000);
            let data = yield call(checkReportPlot, update_request)
            let plot_data = yield call(() => new Promise(res => res(data.json())))
            yield console.log('retry ' + i)
            if (plot_data.status = 'ready'){
                yield put(updateAppParam({ field: 'report_plot', value: { ...plot_data, status:'ready'} }))
                return true;
            }
        }
    }

    yield put(updateAppParam({ field: 'report_plot', value: { status: 'error', id: 0 } }))

    // yield result = ;
}



const reportPlotWatcher = function* (){
    yield takeEvery('GetReportPlot', function* (...args) {
      yield race({
        task: call(reportPlotWorker),
        cancel: take('CancelGetReportPlot')
      })
    })
  }

// const reportPlotWatcher = function* () {
//     yield takeLatest('GetReportPlot', reportPlotWorker)
// }


// const cancelReportPlotWatcher = function* () {
//     yield takeLatest('CancelGetReportPlot', reportPlotWorker)
// }


export { reportPlotWatcher };
import { takeEvery, race, call, take, delay, select, put } from "redux-saga/effects"
import { updateAppParam } from "store/MapFlatsSlice"


const map_flats_request = (data) => {
    return fetch('https://pyxi.pro/tg-web-app/get-cluster-flats', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            search: data.search,
            cluster: data.cluster,
            tg_data: window.Telegram.WebApp.initData || null
        })
    })
}

const mapPointWatcher = function* () {
    yield takeEvery('GetMapPointClick', function* (...args) {
        try {
            yield race({
                task: call(mapPointWorker),
                cancel: take('CancelMapPointClick')
            })
        } catch (e) {
            console.log("Что-то пошло не так");
        }
    })
}

const getMapCluster = (state) => state.mapFlats.app_params.map_flats_request
const getSearch = (state) => state.mapFlats.search

const mapPointWorker = function* () {
    yield put(updateAppParam({ field: 'map_flats', value: [] }))
    yield put(updateAppParam({ field: 'map_flats_status', value: 'pending' }))
    const cluster = yield select(getMapCluster);
    const search = yield select(getSearch);
    yield delay(300)
    let data = yield call(map_flats_request, { search: search, cluster: cluster })
    let flats = yield call(() => new Promise(res => res(data.json())))
    yield put(updateAppParam({ field: 'map_flats', value: flats }))
    yield put(updateAppParam({ field: 'map_flats_status', value: 'ready' }))

    
    yield console.log(flats);
}

export { mapPointWatcher, mapPointWorker }

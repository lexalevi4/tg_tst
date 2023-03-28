import { put, takeEvery, call, select } from "redux-saga/effects"
import { updateSearch } from "store/MapFlatsSlice"
// import { updateAppParam } from "store/MapFlatsSlice"

const getDistricts = (state) => state.mapFlats.search.districts
// const getOkrugs = (state) => state.mapFlats.search.okrugs
const getMetro = (state) => state.mapFlats.search.metro




const distritsChangeWorker = function* (action) {

    yield console.log(action);
    const districts = yield select(getDistricts);
    const arr = [];
    yield districts.map(function (item, index) {
        arr.push(item);
        return true;
    })
    if (yield arr.includes(action)) {
        yield arr.splice(arr.indexOf(action), 1)
    } else {
        yield arr.push(action)
    }
    yield put(updateSearch({ field: 'districts', value: arr }))

}


const districtsChangeWatcher = function* () {
    yield takeEvery('UpdateDistrict', function* (...args) {
        try {
            yield call(distritsChangeWorker, args[0].action)
        } catch (e) {
            console.log("Что-то пошло не так");
        }
    })
}


const metroChangeWatcher = function* () {
    yield takeEvery('UpdateMetro', function* (...args) {
        try {
            yield call(metroChangeWorker, args[0].action)
        } catch (e) {
            console.log("Что-то пошло не так");
        }
    })
}
const metroChangeWorker = function* (id) {
    const arr = [];
    const metro = yield select(getMetro);
    yield metro.map(function (item, index) {
        arr.push(item);
        return true;
    })
    if (yield arr.includes(id)) {
        yield arr.splice(arr.indexOf(id), 1)
    } else {
        yield arr.push(id)
    }
    yield put(updateSearch({ field: 'metro', value: arr }))

}

export { districtsChangeWatcher, metroChangeWatcher }
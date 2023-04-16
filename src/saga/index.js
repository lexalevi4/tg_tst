import { all } from "redux-saga/effects";
import { reportPlotWatcher, statPlotWatcher } from "./plotSaga";
import {districtsChangeWatcher, metroChangeWatcher }from "./searchSaga";
import { mapPointWatcher } from "./mapSaga";


export function* helloSaga() {
  yield console.log('Hello Sagas!')
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    reportPlotWatcher(),
    statPlotWatcher(),
    districtsChangeWatcher(),
    metroChangeWatcher(),
    mapPointWatcher()
  ])
}
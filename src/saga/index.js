import { all } from "redux-saga/effects";
import { reportPlotWatcher, statPlotWatcher } from "./plotSaga";


export function* helloSaga() {
  yield console.log('Hello Sagas!')
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    reportPlotWatcher(),
    statPlotWatcher()
  ])
}
import { takeEvery, race, call, take,delay  } from "redux-saga/effects"



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

const mapPointWorker = function* () {

    yield delay(500)
    yield console.log(1);
}

export { mapPointWatcher, mapPointWorker }

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import MapFlatsReduser from './MapFlatsSlice';
import { PyxiApi } from "./PyxiApi";
import rootSaga from 'saga';


// const CurrVersion = 2;
//
// if (Number(localStorage.getItem('appVersion')) !== CurrVersion) {
//     console.log('update')
//     localStorage.setItem('appVersion', CurrVersion)
//     localStorage.removeItem('persist:root')
// }

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    mapFlats: MapFlatsReduser,
    PyxiApi: PyxiApi.reducer
});


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(PyxiApi.middleware).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
// const 
export const action = (type) => store.dispatch({ type });
export const action_with_payload = (type, action) => store.dispatch({ type:type ,action });
export const persistor = persistStore(store);
export default store;


// export default configureStore({
//     reducer: {
//         mapFlats: MapFlatsReduser,
//     }
// });
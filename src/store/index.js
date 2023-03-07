import {configureStore} from '@reduxjs/toolkit'
import MapFlatsReduser from './MapFlatsSlice';

export default configureStore({
    reducer: {
        mapFlats: MapFlatsReduser,
    }
});
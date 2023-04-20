// import MapWithRemoteObjectManager from "compontents/MapWithRemoteObjectManager";
import { lazy } from "react";

// import {YMaps} from "@pbe/react-yandex-maps";
const MapWithRemoteObjectManager = lazy(() => import('compontents/MapWithRemoteObjectManager'));
const Mappage = function () {

    
    return (
        <>
                <MapWithRemoteObjectManager />
        </>
    )

}
export default Mappage;
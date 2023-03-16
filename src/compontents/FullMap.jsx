import {React} from 'react';
import MapWithRemoteObjectManager from "./MapWithRemoteObjectManager";
import MapOffcanvas from "./MapOffcanvas";

const FullMap = function () {
    return (
        <>
            <MapWithRemoteObjectManager />
            <MapOffcanvas />
        </>
    )
}
export default FullMap;


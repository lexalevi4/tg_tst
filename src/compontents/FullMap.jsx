import {React} from 'react';
import {YMaps} from '@pbe/react-yandex-maps';

import MapWithRemoteObjectManager from "./MapWithRemoteObjectManager";
import {useSelector, } from 'react-redux'

const FullMap = function () {


    // const cachedValue = useMemo(() => 0)


    const flats = useSelector(state => state.mapFlats.flats);

    return (


        <div>
            {/*<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"*/}
            {/*        data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Open offCanvas*/}
            {/*</button>*/}
            <div>
                <YMaps query={{load: "package.full"}}>


                    <MapWithRemoteObjectManager>
                        {/*<ZoomControl  />*/}

                    </MapWithRemoteObjectManager>

                    {/*<Map></Map>*/}


                </YMaps>
            </div>

            <div>

                <div>

                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false"
                         tabIndex="-1"
                         id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Colored with scrolling</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <p>Try scrolling the rest of the page to see this option in action.</p>

                            <ul>

                                {flats.map((flat) => (
                                    <ul>
                                        <li key={flat.objectId}>
                                            <span>{flat.objectId}</span>
                                        </li>

                                    </ul>
                                ))}
                            </ul>


                        </div>
                    </div>

                </div>
            </div>

        </div>
    )

}
export default FullMap;


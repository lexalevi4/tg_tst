import React, {useEffect, useRef, useCallback} from 'react'
import {useDispatch} from 'react-redux'

import {useYMaps} from "@pbe/react-yandex-maps";

import {fetchFlats} from '../store/MapFlatsSlice'

const MapWithRemoteObjectManager = () => {
    const mapRef = useRef(null);
    window.ymaps = useYMaps();
    // const dispatch = useDispatch();

    // const handleClick = useCallback(async (flats) => {
    //     await dispatch(fetchFlats(flats.join(',')))
    // }, [dispatch])


    useEffect(() => {
            if (!window.ymaps || !mapRef.current

            ) {
                return;
            }
            window.map = new window.ymaps.Map(mapRef.current, {
                controls: [],
                center: [55.751574, 37.573856], zoom: 15,
            }, {
                // maxZoom: 16,
                // minZoom: 10
            });


            var zoomControl = new window.ymaps.control.ZoomControl({
                options: {
                    size: "small", position: {
                        // parent.
                        top: window.innerHeight * 0.4, right: 15
                    }
                }
            });
            window.map.controls.add(zoomControl);


            var myButton = new window.ymaps.control.Button("My button");
            window.map.controls.add(myButton, {
                position: {
                    top: 10, right: 10
                },
            });
            window.rom = new window.ymaps.RemoteObjectManager('https://pyxi.pro/tg-web-app/map-cluster?x=%x&y=%y&z=%z&bbox=%b&t=%t&%c',{
                splitRequests: true,
                // clusterHasBalloon: false,
                // iconPieChartCoreRadius: 18,
                // clusterIconLayout: 'default#pieChart'
            });
            

            window.map.geoObjects.add(window.rom);
            // eslint-disable-next-line
        }, [window.ymaps]
        // }, []
    )
    ;


    return (<div ref={mapRef} style={{width: '99vw', height: '95vh'}}></div>);
};
export default MapWithRemoteObjectManager;
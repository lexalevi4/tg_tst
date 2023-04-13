import React, { useEffect, useRef, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { useYMaps } from "@pbe/react-yandex-maps";

// import {fetchFlats} from '../store/MapFlatsSlice'



const serialize = function (obj, prefix) {
    var str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    // let mid =str.join("&")
    var result = str.join("&")
    return result.replace(/&&+/gi, '&')
}

const MapWithRemoteObjectManager = () => {
    const mapRef = useRef(null);
    window.ymaps = useYMaps();
    // const dispatch = useDispatch();

    // const handleClick = useCallback(async (flats) => {
    //     await dispatch(fetchFlats(flats.join(',')))
    // }, [dispatch])
    const search = useSelector(state => state.mapFlats.search, shallowEqual)

    useEffect(() => {
        if (!window.ymaps || !mapRef.current

        ) {
            return;
        }
        window.map = new window.ymaps.Map(mapRef.current, {
            controls: [],
            center: [55.751574, 37.573856], zoom: 10,
        }, {
            // maxZoom: 16,
            // minZoom: 10
        });


        var zoomControl = new window.ymaps.control.ZoomControl({
            options: {
                zoomDuration:0,
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
        window.rom = new window.ymaps.RemoteObjectManager('https://pyxi.pro/tg-web-app/map-cluster?z=%z&bbox=%b&'+serialize(search), {
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


    return (<div ref={mapRef} style={{ width: '99vw', height: '95vh' }}></div>);
};
export default MapWithRemoteObjectManager;
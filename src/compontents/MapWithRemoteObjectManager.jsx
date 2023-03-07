import React, {useEffect, useRef,  useCallback} from 'react'
import { useDispatch} from 'react-redux'

import {useYMaps} from "@pbe/react-yandex-maps";

import {addFlats, cleanFlats} from '../store/MapFlatsSlice'

const MapWithRemoteObjectManager = () => {
    const mapRef = useRef(null);
    window.ymaps = useYMaps(['Map', 'LoadingObjectManager', 'templateLayoutFactory', 'Placemark', 'geoQuery']);

    // const flats = []

    const dispatch = useDispatch();

    // const [flat_id, setFlat_id] = useState(0);

    const handleClick = useCallback(async (flats) => {
        await dispatch(addFlats({flats}))

    }, [dispatch])


    const clean_all_flats = useCallback(async () => {
        await dispatch(cleanFlats())
    }, [dispatch])

    // const flats = useSelector(state => state.mapFlats.flats)


    useEffect(() => {
            if (!window.ymaps || !mapRef.current

            ) {
                return;
            }


            const showCanvas = () => {
                var myOffcanvas = document.getElementById('offcanvasScrolling')
                //eslint-disable-next-line no-undef
                var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
                bsOffcanvas.show()
            }

            // const map = new ymaps.Map(mapRef.current, {
                window.map = new window.ymaps.Map(mapRef.current, {
                controls: [],
                center: [55.751574, 37.573856], zoom: 15,
            }, {
                maxZoom: 16,
                minZoom: 12
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
                // float: "none",
                position: {
                    top: 10, left: 10
                },


            });

            // ymaps.ControlSetKey = 'smallMapDefaultSet'
            // const contols = new ymaps.conrols.Manager();
            window.rom = new window.ymaps.LoadingObjectManager('https://pyxi.pro/parced-flat/map-objects?lat=0&ParcedFlatSearch[bbox]=%b&ParcedFlatSearch[cat]=1&ParcedFlatSearch[rooms][0]=1&ParcedFlatSearch[date]=23.02.2023+-+01.03.2023', {
                clusterize: true,
                clusterIconLayout: 'default#pieChart', // Опции кластеров задаются с префиксом cluster.
                clusterHasBalloon: false,
                iconPieChartCoreRadius: 18,
                geoObjectOpenBalloonOnClick: false,
                splitRequests: true,
            });


            function onObjectEvent(e) {
                var objectId = e.get('objectId');
                window.e = e;
                // console.log(objectId)
                // setFlat_id(objectId)
                // addFlats({objectId})
                // clean_all_flats().then()
                handleClick([{objectId}])
                // f(objectId)
                // console.log(setFlat_id(objectId))
                // f(objectId)
                // setFlat_id(objectId)
                // var myOffcanvas = document.getElementById('offcanvasScrolling')
                //eslint-disable-next-line no-undef
                // var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
                // bsOffcanvas.show()
                showCanvas()
                // console.log(objectId)
                // console.log(flat_id)
            }

            function onTotalButtonEvent(e) {


                // bounds.map((bound)=>{
                //     polygon.push([bound[0],bound[1]]);
                //     polygon.push([bound[1],bound[0]]) ;
                // })

                // console.log(map.geoObjects);
                var result = window.ymaps.geoQuery(window.map.geoObjects).searchIntersect(window.map);
                // result.then(function () {
                //     alert('Количество объектов, лежащих внутри заданной области: ' + result.getLength());
                // });
                console.log(result)
                console.log("Number of geo objects in the visible map area: " + result.getLength());

            }

            function onClusterEvent(e) {
                console.log(e)
                window.e = e;
                console.log(e.get('objectId'));
                window.cluster = e.get('target');
                var flats = [];
                var cluster = window.rom.clusters.getById(e.get('objectId'))
                var objects = cluster.properties.geoObjects
                objects.map((object) => {
                    flats.push({
                        objectId: object.id
                    })
                    return true;
                })
                // var object = rom.objects.getById(e.get('objectId'));
                console.log(objects)
                console.log(flats)
                handleClick(flats)

                // var features = window.cluster.getAll()[0]._data.features;
                // var features = llqq[0]._data.features;
                // console.log(features)
                // clean_all_flats().then(
                //
                //     features.map(function (feature) {
                //         handleClick({objectId: feature.id})
                //         // flats.push({
                //         //     objectId: feature.id
                //         // })
                //         return true;
                //     })
                //
                // )

                showCanvas()
                // console.log(flats)
                // handleClick(flats)

                // console.log(window.cluster.getGeoObjects())
                // console.log(objectId)
                // window.rom = rom;
                // console.log(rom.clusters);

            }

            window.rom.objects.events.add(['click'], onObjectEvent);
            window.rom.clusters.events.add(['click'], onClusterEvent);

            myButton.events.add(['click'], onTotalButtonEvent);
            window.map.geoObjects.add(window.rom);
            // console.log(height)
        }, [window.ymaps, handleClick, clean_all_flats]
        // }, []
    )
    ;


    return (<div ref={mapRef} style={{width: '100vw', height: '100vh'}}></div>);
};
export default MapWithRemoteObjectManager;
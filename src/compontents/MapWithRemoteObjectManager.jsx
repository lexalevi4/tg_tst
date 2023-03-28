import React, {useEffect, useRef, useCallback} from 'react'
import {useDispatch} from 'react-redux'

import {useYMaps} from "@pbe/react-yandex-maps";

import {fetchFlats} from '../store/MapFlatsSlice'

const MapWithRemoteObjectManager = () => {
    const mapRef = useRef(null);
    window.ymaps = useYMaps();
    const dispatch = useDispatch();

    const handleClick = useCallback(async (flats) => {
        await dispatch(fetchFlats(flats.join(',')))
    }, [dispatch])


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
                minZoom: 10
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

            window.rom = new window.ymaps.LoadingObjectManager('https://pyxi.pro/tg-web-app/map-objects?bbox=%b', {
                clusterize: true,
                clusterIconLayout: 'default#pieChart', // Опции кластеров задаются с префиксом cluster.
                clusterHasBalloon: false,
                iconPieChartCoreRadius: 18,
                geoObjectOpenBalloonOnClick: false,
                splitRequests: true,
            });


            function onObjectEvent(e) {
                handleClick([e.get('objectId')])
                showCanvas()
            }

            function onTotalButtonEvent(e) {

            }

            function onClusterEvent(e) {
                var flatids = [];
                var cluster = window.rom.clusters.getById(e.get('objectId'))
                var objects = cluster.properties.geoObjects
                objects.map((object) => {
                    flatids.push(object.id)
                    return true;
                })
                handleClick(flatids)
                showCanvas()

            }

            window.rom.objects.events.add(['click'], onObjectEvent);
            window.rom.clusters.events.add(['click'], onClusterEvent);

            var listBoxItems = ['0', '1', '2', '3', '4']
                    .map(function (title) {
                        return new window.ymaps.control.ListBoxItem({
                            data: {
                                content: title
                            },
                            state: {
                                selected: true
                            }
                        })
                    }),
                reducer = function (filters, filter) {
                    filters[filter.data.get('content')] = filter.isSelected();
                    return filters;
                },
                // Теперь создадим список, содержащий 5 пунктов.
                listBoxControl = new window.ymaps.control.ListBox({
                    data: {
                        content: 'Цены',
                        title: 'Цены'
                    },
                    position: {
                        top: 10, right: 10
                    },
                    items: listBoxItems,
                    state: {
                        // Признак, развернут ли список.
                        expanded: true,
                        filters: listBoxItems.reduce(reducer, {})
                    }
                });

            // Добавим отслеживание изменения признака, выбран ли пункт списка.
            listBoxControl.events.add(['select', 'deselect'], function (e) {
                var listBoxItem = e.get('target');
                var filters = window.ymaps.util.extend({}, listBoxControl.state.get('filters'));
                filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
                listBoxControl.state.set('filters', filters);
            });

            var filterMonitor = new window.ymaps.Monitor(listBoxControl.state);
            filterMonitor.add('filters', function (filters) {
                // Применим фильтр.
                window.rom.setFilter(getFilterFunction(filters));
            });

            function getFilterFunction(categories) {
                return function (obj) {
                    var content = obj.properties.price_class;
                    return categories[content]
                }
            }
            window.map.controls.add(listBoxControl);


            myButton.events.add(['click'], onTotalButtonEvent);
            window.map.geoObjects.add(window.rom);
            // eslint-disable-next-line
        }, [window.ymaps, handleClick]
        // }, []
    )
    ;


    return (<div ref={mapRef} style={{width: '100vw', height: '90vh'}}></div>);
};
export default MapWithRemoteObjectManager;
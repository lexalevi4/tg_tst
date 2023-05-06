import React, { useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { useYMaps } from "@pbe/react-yandex-maps";
import { updateAppParam, updateSearch } from 'store/MapFlatsSlice';
// import { Box, Paper } from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { useState } from 'react';

import { getMapPointClick } from 'saga/actions';
import { lazy } from 'react';

// import MapFlatsModal from './MapFlatsModal';
const MapFlatsModal = lazy(() => import('./MapFlatsModal'));

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
    var result = str.join("&")
    return result.replace(/&&+/gi, '&')
}


const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

const MapWithRemoteObjectManager = () => {
    const mapRef = useRef(null);
    window.ymaps = useYMaps();
    const dispatch = useDispatch();




    useEffect(() => {

        dispatch(updateAppParam({ field: 'stat_plot_open', value: false }))
        dispatch(updateAppParam({ field: 'report_plot_open', value: false }))

    }, [])


    const search = useSelector(state => state.mapFlats.search, shallowEqual)
    const price_types = useSelector(state => state.mapFlats.params.price_type, shallowEqual)
    const user = useSelector(state => state.mapFlats.app_params.user, shallowEqual)



    const [map_flats_modal_open, setMapFlatsModalOpen] = useState(false)


    const handleClusterClick = (object) => {

        setMapFlatsModalOpen(true)
        dispatch(updateAppParam({ field: 'map_flats_status', value: 'pending' }))
        dispatch(updateAppParam({ field: 'map_flats_request', value: object }))
        dispatch(getMapPointClick);
    }

    const handleMapFlatsModal = () => {
        setMapFlatsModalOpen(!map_flats_modal_open)
    }


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
                zoomDuration: 0,
                size: "small", position: {
                    // parent.
                    top: window.innerHeight * 0.4, right: 15
                }
            }
        });
        window.map.controls.add(zoomControl);

        var selected_types = search.price_type.slice();
        // console.log(selected_types)
        if (selected_types.length === 0) {
            selected_types = ['1', '2', '3', '4', '5'];
        }
        // console.log(selected_types)
        // console.log(serialize({ 'selected_types': selected_types }))

        const getUrl = () => {
            let link = 'https://pyxi.pro/tg-web-app/map-cluster?z=%z&bbox=%b&'
                + serialize(search)
                + '&'
                + serialize({ 'selected_types': selected_types })

            if (user.id > 0) {
                link += '&user_id=' + user.id
            } else {
                link += '&user_id=0'
            }

            return link

        }


        window.rom = new window.ymaps.RemoteObjectManager(getUrl(), {
            splitRequests: true,
        });


        window.rom.objects.events.add(['click'], onObjectEvent);

        function onObjectEvent(e) {
            let object = window.rom.objects.getById(e.get('objectId'));
            if (object.properties.type === 'cluster') {
                var current_zoom = window.map.getZoom();
                if (current_zoom < 16) {
                    window.map.setZoom(current_zoom + 1)
                    window.map.setCenter(object.geometry.coordinates)
                } else {
                    // console.log(object.properties.qk)
                    // console.log(object.properties.z)
                    handleClusterClick(object.properties)
                }
            }
            if (object.properties.type === 'point') {
                // console.log(object.properties.flat)
                handleClusterClick(object.properties)
            }
        }

        var listBoxItems = price_types
            .map(function (type) {
                return new window.ymaps.control.ListBoxItem({
                    data: {
                        content: '<span style="color:' + type.color + '">' + type.title + '</span>'
                        // content:  type.title
                    },
                    state: {
                        selected: selected_types.includes(String(type.val))
                    }
                })
            }),
            reducer = function (filters, filter) {
                filters[filter.data.get('content').replace(htmlRegexG, '')] = filter.isSelected();
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
            // console.log(e)
            var listBoxItem = e.get('target');
            var filters = window.ymaps.util.extend({}, listBoxControl.state.get('filters'));
            filters[listBoxItem.data.get('content').replace(htmlRegexG, '')] = listBoxItem.isSelected();
            // console.log( filters[listBoxItem.data.get('content')]);
            listBoxControl.state.set('filters', filters);
        });

        var filterMonitor = new window.ymaps.Monitor(listBoxControl.state);

        filterMonitor.add('filters', function (filters) {
            // Применение фильтра к ObjectManager.
            console.log(filters)

            selected_types = [];
            price_types.map(function (type) {
                if (filters[type.title]) {
                    selected_types.push(String(type.val))
                }
                return true;
            })
            console.log(selected_types);
            window.rom.setUrlTemplate('https://pyxi.pro/tg-web-app/map-cluster?z=%z&bbox=%b&' + serialize(search) + '&' + serialize({ 'selected_types': selected_types }))
            window.rom.reloadData()
            dispatch(updateSearch({ field: 'price_type', value: selected_types }))
        });

        window.map.controls.add(listBoxControl);


        window.map.geoObjects.add(window.rom);
        // eslint-disable-next-line
    }, [window.ymaps]
    );


    return (
        <>
            <Box>
                <Paper
                    className='p-0'
                    style={{ width: '96vw', height: '90vh' }}
                >
                    <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
                    </div>
                </Paper>
            </Box>
            <MapFlatsModal
                handleMapFlatsModal={handleMapFlatsModal}
                map_flats_modal_open={map_flats_modal_open}
                dispatch={dispatch}
            />
        </>
    );
};
export default MapWithRemoteObjectManager;
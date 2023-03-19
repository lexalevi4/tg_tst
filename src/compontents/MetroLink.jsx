import {shallowEqual, useDispatch, useSelector} from "react-redux";
import React from "react";
import {updateSearch} from "../store/MapFlatsSlice";
// import {updateSearch} from "../store/MapFlatsSlice";

const MetroLink = function ({

                                id,
                                div_left,
                                div_top,
                                img_left,
                                img_top,
                                checked,
                                metro,
                                func_test


                            }) {
    const state = useSelector(state => state.mapFlats.search.metro, shallowEqual);

    const dispatch = useDispatch();


    const station = {
        id: id,
        div_left: div_left,
        div_top: div_top,
        img_left: img_left,
        img_top: img_top,
        metro: metro,
        checked: checked
    }


    const checkMetro = (id) => {
        id = Number(id)
        // console.log(state.indexOf(id))
        if (state.indexOf(id) > -1) {
            return true
        } else {
            return false
        }
    }

    const handleStationClick = e => {
        let param = e.target.dataset.onclickparam
        // console.log(param);
        handleClick(param);
        // console.log(params.field);
        // handleBrunch(param)
    };


    const handleClick = (id) => {
        // console.log(id);
        id = Number(id)
        let arr = [];
        state.map(function (item, index) {
            arr.push(item);
            return true;
        })
        if (arr.indexOf(id) > -1) {
            arr.splice(arr.indexOf(id), 1)
        } else {
            arr.push(id)
        }
        dispatch(updateSearch({field: 'metro', value: arr}))

    }


    return (
        <>
            <img
                key={station.id + "img"}
                src='https://img.pyxi.pro/tchk.gif'
                id={'metro_img' + station.id}
                alt={'tchk'}
                // className={(checkMetro(station.id)) ? '' : "station_img_hidden"}
                className={(station.checked) ? '' : "station_img_hidden"}
                style={{
                    // display: 'none',
                    position: 'absolute',
                    left: station.img_left + "px",
                    top: (Number(station.img_top) + 22) + "px",
                }}
            />
            {
                console.log('qq')
            }

            <div
                key={station.id + "div"}
                className={'metro_div'}
                // onClick={() => handleClick(station.id)}

                style={{
                    position: 'absolute',
                    left: station.div_left + "px",
                    top: (Number(station.div_top) + 18) + "px",

                }}
            >
                <span
                    key={station.id + "link"}
                    // className={(checkMetro(station.id)) ? 'station_link_active' : "station_link"}
                    className={(checkMetro(station.checked)) ? 'station_link_active' : "station_link"}
                    onClick={handleStationClick}
                    data-onclickparam={station.id}
                    // className={'station_link'}
                    style={{
                        fontSize: '10px'
                    }
                    }
                >{station.metro}</span>
            </div>
        </>
    )
}

const areEqual = (prevProps, nextProps) => {
    // console.log(prevProps)
    // console.log(nextProps)
    if (prevProps.checked === nextProps.checked) {
        return true                                    // donot re-render
    }
    return false                                     // will re-render
}


export default React.memo(MetroLink, areEqual)
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
import React, { useMemo } from "react";
// import { updateSearch } from "../store/MapFlatsSlice";
import Typography from "@mui/material/Typography";
// import {updateSearch} from "../store/MapFlatsSlice";

const MetroLinkMu = function ({
    handleStationClick,
    state,
    station
}) {

    const checked = useMemo(() => {
        let id = Number(station.id)
        return state.includes(id)
    }, [state, station])


    return (
        useMemo(() => {
            return (
                <>
                    <img
                        key={station.id + "img"}
                        src='https://img.pyxi.pro/tchk.gif'
                        id={'metro_img' + station.id}
                        alt={'tchk'}
                        className={(checked) ? '' : "station_img_hidden"}
                        style={{
                            position: 'absolute',
                            left: (Number(station.img_left) + 24+28) + "px",
                            top: (Number(station.img_top) + 96+40) + "px",
                        }}
                    />
                    {
                        console.log('qq')
                    }

                    <div
                        key={station.id + "div"}
                        className={'metro_div'}
                        style={{
                            position: 'absolute',
                            left: (Number(station.div_left) + 22 +28) + "px",
                            top: (Number(station.div_top) + 98+40) + "px",

                        }}
                    >
                        <Typography
                            key={station.id + "link"}
                            className={checked ? 'station_link_active' : "station_link"}
                            onClick={handleStationClick}
                            data-onclickparam={station.id}
                            style={{
                                fontSize: '10px'
                            }
                            }
                        >{station.metro}</Typography>
                    </div>
                </>
            )
        }, [checked, station])

    )
}

export default MetroLinkMu
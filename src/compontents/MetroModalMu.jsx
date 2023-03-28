import React, { useCallback } from 'react'
import "./../css/style.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
// import { Button } from "react-bootstrap";
// import MetroLink from "./MetroLink";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../store/MapFlatsSlice";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MetroLinkMu from './MetroLinkMu';
import { updateMetro } from 'saga/actions';
// import {useDispatch, useSelector} from "react-redux";
// import {updateSearch} from "../store/MapFlatsSlice";
// import {setInitialBrunches, setInitialStations} from "../store/MapFlatsSlice";

const MetroModalMu = function ({ is_open, handleClose }) {

    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    // });

    // const state = useSelector(state => state.mapFlats, shallowEqual);
    const brunches = useSelector(state => state.mapFlats.search.brunches, shallowEqual);
    const metro_selected = useSelector(state => state.mapFlats.search.metro, shallowEqual);
    const params = useSelector(state => state.mapFlats.params, shallowEqual);
    const dispatch = useDispatch();


    // const dropStations = useCallback(async (bruch) => {
    //     await dispatch(updateSearch({field: 'brunches', value: []}))
    //     await dispatch(updateSearch({field: 'metro', value: []}))
    //
    // }, [dispatch])


    const dropStations = () => {
        dispatch(updateSearch({ field: 'brunches', value: [] }))
        dispatch(updateSearch({ field: 'metro', value: [] }))

    }


    const checkBrunch = (id) => {
        if (brunches.indexOf(id) > -1) {
            return false
        } else {
            return true
        }
    }




    const handleBrunch = (bruch) => {
        // console.log(bruch);
        let current_brunch = params.brunches[bruch]
        // console.log(current_brunch);
        let brunches_arr = [];
        let metro_arr = [];
        brunches.map(function (item, index) {

            brunches_arr.push(item);
            return true;
        })
        metro_selected.map(function (item, index) {
            metro_arr.push(item);
            return true;
        })
        if (brunches_arr.indexOf(bruch) > -1) {
            brunches_arr.splice(brunches_arr.indexOf(bruch), 1)
            current_brunch.map(function (item) {
                if (metro_arr.indexOf(item) > -1) {
                    metro_arr.splice(metro_arr.indexOf(item), 1)
                }
                return true;
            })
        } else {
            // console.log('добавляем')
            brunches_arr.push(bruch)
            current_brunch.map(function (item) {
                if (metro_arr.indexOf(item) < 0) {
                    metro_arr.push(item)
                }
                return true;
            })
        }
        dispatch(updateSearch({ field: 'brunches', value: brunches_arr }))
        dispatch(updateSearch({ field: 'metro', value: metro_arr }))

        // return true

    }


    const handleBrunchClick = e => {
        // let param =
        handleBrunch(Number(e.target.dataset.onclickparam));
    };

    // const handleStationClick = e => {
    //     console.log(e)

    // }


    const handleStationClick = useCallback((e) => {
        dispatch(updateMetro(Number(e.target.dataset.onclickparam)))
    }, [])

    // const stations = useMemo(() => {
    //     let result = [];
    //     const checkMetro = (id) => {
    //         if (metro_selected.indexOf(id) > -1) {
    //             return true
    //         } else {
    //             return false
    //         }
    //     }

    //     params.metro.map(function (station) {

    //         result.push({
    //             id: station.id,
    //             img_top: station.img_top,
    //             img_left: station.img_left,
    //             div_top: station.div_top,
    //             div_left: station.div_left,
    //             metro: station.metro,
    //             checked: checkMetro(station.id)
    //         })
    //         return true;
    //     })
    //     return result;

    // }, [metro_selected, params.metro])

    return (


        // <div className="modal fade" id="metroModal" tabIndex="-1" aria-labelledby="metroModalLabel"

        //      aria-hidden="true" style={{
        //     overflowX: "auto",
        //     '--bs-modal-width': 'none'
        // }}>
        //     <div className="modal-dialog" style={{width: "1235px"}}>
        //         <div className="modal-content">
        //             <div className="modal-header">
        //                 <h5 className="modal-title" id="metroModalLabel">Выбрать метро</h5>
        //                 <button type="button" className="btn-close" data-bs-dismiss="modal"
        //                         aria-label="Закрыть"></button>
        //             </div>



        <Dialog
            fullScreen
            keepMounted
            open={is_open}
            scroll='paper'
            onClose={handleClose}
        // TransitionComponent={Transition}
        >
            <div
                className='m-3 p-2 pt-5 pb-5'
                style={{
                    // marginTop:80
                }}



            >
                <div

                    className='m-3 p-2 mt-5 mb-5'
                    style={{
                        width: '1235px',
                        marginTop: 80,
                        marginBottom: 80
                    }}


                >


                    <span id="unsel"

                        onClick={dropStations}
                        style={{ "marginBottom": "10px" }}>Убрать все
                        станции</span>
                    <table>

                        <tbody>
                            <tr>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        // className="select_brunch"
                                        className={checkBrunch(1) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={1}
                                        style={{ "color": "#EF1E25" }}
                                    >Красная
                                        верх</Typography>
                                    <Typography
                                        className={checkBrunch(13) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={13}

                                        style={{ "color": "#EF1E25" }}
                                    >Красная
                                        низ</Typography>
                                </td>
                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={checkBrunch(2) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={2}


                                        style={{ "color": "#029A55" }}
                                    >Зелёная
                                        верх</Typography>
                                    <Typography
                                        className={checkBrunch(14) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={14}
                                        style={{ "color": "#029A55" }}
                                    >Зелёная
                                        низ</Typography>

                                </td>
                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={checkBrunch(3) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={3}


                                        style={{ "color": "#0252A2" }}
                                    >Синяя
                                        запад</Typography>
                                    <Typography
                                        className={checkBrunch(15) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={15}
                                        style={{ "color": "#0252A2" }}
                                    >Синяя
                                        восток</Typography>
                                    <Typography
                                        className={checkBrunch(4) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={4}


                                        style={{ "color": "#019EE0" }}
                                    >Филёвская</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={checkBrunch(6) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={6}

                                        style={{ "color": "#FBAA33" }}
                                    >Оранжевая верх</Typography>
                                    <Typography
                                        className={checkBrunch(16) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={16}

                                        style={{ "color": "#FBAA33" }}
                                    >Оранжевая
                                        низ</Typography>
                                    <Typography
                                        className={checkBrunch(11) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={11}

                                        style={{ "color": "#85D4F3" }}
                                    >Бутовская</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={checkBrunch(8) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={8}
                                        style={{ "color": "#ACADAF" }}


                                    >Серая верх</Typography>
                                    <Typography
                                        className={checkBrunch(17) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={17}
                                        style={{ "color": "#ACADAF" }}


                                    >Серая низ</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={checkBrunch(9) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={9}


                                        style={{ "color": "#B1D332" }}
                                    >Салатовая верх</Typography>
                                    <Typography
                                        className={checkBrunch(18) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={18}


                                        style={{ "color": "#B1D332" }}
                                    >Салатовая низ</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={checkBrunch(12) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={12}


                                        style={{ "color": "#AB258C" }}
                                    >Фиолетовая верх</Typography>
                                    <Typography
                                        className={checkBrunch(19) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={19}


                                        style={{ "color": "#AB258C" }}
                                    >Фиолетовая низ</Typography>

                                    <Typography
                                        className={checkBrunch(45) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={45}


                                        style={{ "color": "#DE63A1" }}
                                    >Некрасовская</Typography>


                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={checkBrunch(7) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={7}


                                        style={{ "color": "#FFD803" }}
                                    >Калининская</Typography>
                                    <Typography
                                        className={checkBrunch(40) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={40}


                                        style={{ "color": "#FFD803" }}
                                    >Солнцевская</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={checkBrunch(5) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={5}

                                        style={{ "color": "#8D7A55" }}
                                    >Кольцевая</Typography>
                                    <Typography
                                        className={checkBrunch(35) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={35}

                                        style={{ "color": "#FFA8AF" }}
                                    >МЦК</Typography>
                                    <Typography
                                        className={checkBrunch(44) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={44}
                                        style={{ "color": "#7FBEBB" }}
                                    >Большое кольцо</Typography>


                                </td>
                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography>
                                        <span
                                            className={checkBrunch(20) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                            onClick={handleBrunchClick}
                                            data-onclickparam={20}

                                            style={{ "color": "#8D7A55" }}
                                        >Внутри кольца</span><br />
                                        От кольца:<br /> <span
                                            className={checkBrunch(21) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                            onClick={handleBrunchClick}
                                            data-onclickparam={21}

                                        >+1</span>
                                        <span
                                            className={checkBrunch(22) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                            onClick={handleBrunchClick}
                                            data-onclickparam={22}
                                        >+2</span>
                                        <span
                                            className={checkBrunch(23) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                            onClick={handleBrunchClick}
                                            data-onclickparam={23}
                                        >+3</span>
                                        <span
                                            className={checkBrunch(24) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                            onClick={handleBrunchClick}
                                            data-onclickparam={24}
                                        >+4</span>
                                    </Typography>
                                </td>


                            </tr>
                        </tbody>
                    </table>


                    <LazyLoadImage
                        style={{
                            marginLeft: '100px'
                        }
                        }
                        src='https://pyxi.pro/metromap_new.png'
                    />

                    {

                        // stations.map(function (station) {
                        params.metro.map(function (station) {


                            return (
                                <MetroLinkMu

                                    key={station.id}
                                    state={metro_selected}
                                    station={station}
                                    handleStationClick={handleStationClick}

                                // station={station}
                                // id={station.id}
                                // div_left={station.div_left}
                                // div_top={station.div_top}
                                // img_left={station.img_left}
                                // img_top={station.img_top}
                                // checked={station.checked}
                                // metro={station.metro}
                                />
                            );
                        })}

                </div>
            </div>
            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar>
                    <IconButton
                        // sx={{
                        //     right: 0
                        // }}
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>

        </Dialog>

        // <div className="modal-footer">
        //     <Button variant="secondary" data-bs-dismiss="modal">
        //         Сбросить
        //     </Button>
        //     <Button variant="primary" data-bs-dismiss="modal">
        //         Сохранить
        //     </Button>
        // </div>
        // </div>
        // </div>
        // </div>
    )
}

export default MetroModalMu
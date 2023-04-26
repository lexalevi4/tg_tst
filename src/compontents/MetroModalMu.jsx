import React, { useCallback } from 'react'
import "./../css/style.css";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../store/MapFlatsSlice";
// import { AppBar, Button, Dialog, Toolbar, Typography } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


// import CloseIcon from '@mui/icons-material/Close';
import MetroLinkMu from './MetroLinkMu';
import { updateMetro } from 'saga/actions';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import CheckIcon from '@mui/icons-material/Check';

const MetroModalMu = function ({ is_open, handleClose }) {

    const brunches = useSelector(state => state.mapFlats.search.brunches, shallowEqual);
    const metro_selected = useSelector(state => state.mapFlats.search.metro, shallowEqual);
    const params = useSelector(state => state.mapFlats.params, shallowEqual);
    const dispatch = useDispatch();

    const dropStations = () => {
        dispatch(updateSearch({ field: 'brunches', value: [] }))
        dispatch(updateSearch({ field: 'metro', value: [] }))

    }


    const handleBrunch = (bruch) => {
        let current_brunch = params.brunches[bruch]
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
    }


    const handleBrunchClick = e => {
        handleBrunch(Number(e.target.dataset.onclickparam));
    };


    const handleStationClick =(e) => {
        dispatch(updateMetro(Number(e.target.dataset.onclickparam)))
    }


    return (
        <Dialog
            fullScreen
            keepMounted
            open={is_open}
            scroll='paper'
            onClose={handleClose}
        >
            <div
                className='m-3 p-2 pt-5 pb-5'
                style={{
                }}
            >
                <div

                    className='m-3 p-2 mt-5 mb-5'
                    style={{
                        width: '1235px',
                        marginTop: 109,
                        marginBottom: 80,
                        marginLeft: 39,

                    }}
                >
                    {/* <span id="unsel"

                        onClick={dropStations}
                        style={{ "marginBottom": "10px" }}>Убрать все
                        станции</span> */}
                    <table>
                        <tbody>
                            <tr>
                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        // className="select_brunch"
                                        className={!brunches.includes(1) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={1}
                                        style={{ "color": "#EF1E25" }}
                                    >Красная
                                        верх</Typography>
                                    <Typography
                                        className={!brunches.includes(13) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={13}

                                        style={{ "color": "#EF1E25" }}
                                    >Красная
                                        низ</Typography>
                                </td>
                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={!brunches.includes(2) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={2}


                                        style={{ "color": "#029A55" }}
                                    >Зелёная
                                        верх</Typography>
                                    <Typography
                                        className={!brunches.includes(14) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={14}
                                        style={{ "color": "#029A55" }}
                                    >Зелёная
                                        низ</Typography>

                                </td>
                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={!brunches.includes(3) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={3}


                                        style={{ "color": "#0252A2" }}
                                    >Синяя
                                        запад</Typography>
                                    <Typography
                                        className={!brunches.includes(15) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={15}
                                        style={{ "color": "#0252A2" }}
                                    >Синяя
                                        восток</Typography>
                                    <Typography
                                        className={!brunches.includes(4) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={4}


                                        style={{ "color": "#019EE0" }}
                                    >Филёвская</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={!brunches.includes(6) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={6}

                                        style={{ "color": "#FBAA33" }}
                                    >Оранжевая верх</Typography>
                                    <Typography
                                        className={!brunches.includes(16) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={16}

                                        style={{ "color": "#FBAA33" }}
                                    >Оранжевая
                                        низ</Typography>
                                    <Typography
                                        className={!brunches.includes(11) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={11}

                                        style={{ "color": "#85D4F3" }}
                                    >Бутовская</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={!brunches.includes(8) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                        onClick={handleBrunchClick}
                                        data-onclickparam={8}
                                        style={{ "color": "#ACADAF" }}


                                    >Серая верх</Typography>
                                    <Typography
                                        className={!brunches.includes(17) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={17}
                                        style={{ "color": "#ACADAF" }}


                                    >Серая низ</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={!brunches.includes(9) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={9}


                                        style={{ "color": "#B1D332" }}
                                    >Салатовая верх</Typography>
                                    <Typography
                                        className={!brunches.includes(18) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={18}


                                        style={{ "color": "#B1D332" }}
                                    >Салатовая низ</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={!brunches.includes(12) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={12}


                                        style={{ "color": "#AB258C" }}
                                    >Фиолетовая верх</Typography>
                                    <Typography
                                        className={!brunches.includes(19) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={19}


                                        style={{ "color": "#AB258C" }}
                                    >Фиолетовая низ</Typography>

                                    <Typography
                                        className={!brunches.includes(45) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={45}


                                        style={{ "color": "#DE63A1" }}
                                    >Некрасовская</Typography>


                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={!brunches.includes(7) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={7}


                                        style={{ "color": "#FFD803" }}
                                    >Калининская</Typography>
                                    <Typography
                                        className={!brunches.includes(40) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={40}


                                        style={{ "color": "#FFD803" }}
                                    >Солнцевская</Typography>
                                </td>

                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography
                                        className={!brunches.includes(5) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={5}

                                        style={{ "color": "#8D7A55" }}
                                    >Кольцевая</Typography>
                                    <Typography
                                        className={!brunches.includes(35) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={35}

                                        style={{ "color": "#FFA8AF" }}
                                    >МЦК</Typography>
                                    <Typography
                                        className={!brunches.includes(44) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={44}
                                        style={{ "color": "#7FBEBB" }}
                                    >Большое кольцо</Typography>


                                </td>
                                <td valign="top" style={{ "paddingLeft": "10px" }}>
                                    <Typography>
                                        <span
                                            className={!brunches.includes(20) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                            onClick={handleBrunchClick}
                                            data-onclickparam={20}

                                            style={{ "color": "#8D7A55" }}
                                        >Внутри кольца</span><br />
                                        От кольца:<br /> <span
                                            className={!brunches.includes(21) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                            onClick={handleBrunchClick}
                                            data-onclickparam={21}

                                        >+1</span>
                                        <span
                                            className={!brunches.includes(22) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                            onClick={handleBrunchClick}
                                            data-onclickparam={22}
                                        >+2</span>
                                        <span
                                            className={!brunches.includes(23) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                            onClick={handleBrunchClick}
                                            data-onclickparam={23}
                                        >+3</span>
                                        <span
                                            className={!brunches.includes(24) ? 'select_brunch ' : "select_brunch brunch_link_active"}
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

                        params.metro.map(function (station) {
                            return (
                                <MetroLinkMu
                                    key={station.id}
                                    state={metro_selected}
                                    station={station}
                                    handleStationClick={handleStationClick}

                                />
                            );
                        })}

                </div>
            </div>
            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar
                    style={{
                        justifyContent: 'space-around'
                    }}
                >

                    <Button
                        className='mr-1 w-2/5'
                        // fullWidth
                        variant='contained'
                        startIcon={<RemoveDoneIcon />}
                        onClick={dropStations}
                        color="error"
                    >
                        Сбросить
                    </Button>
                    <Button
                        className='ml-1 w-2/5'
                        // fullWidth
                        color="success"
                        variant='contained'
                        onClick={handleClose}
                        startIcon={<CheckIcon />}
                    >
                        Сохранить
                    </Button>


                </Toolbar>
            </AppBar>

        </Dialog>
    )
}

export default MetroModalMu
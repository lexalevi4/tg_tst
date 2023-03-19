import { useCallback, useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComp from './compontents/NavbarComp'
import { Outlet } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";
import { setInitialBrunches, setInitialDistricts, setInitialStations, updateAppParam } from "./store/MapFlatsSlice";
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, Modal, Paper, Slide, Toolbar, Typography } from '@mui/material';
// import {Container} from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
const tg = window.Telegram.WebApp;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function App() {

    // return (
    const [report_plot_open, setReport_plot_open] = useState(false);


    // const handleReportPlotOpen = () => {
    //     console.log('asdfadf');
    //     setReport_plot_open(!report_plot_open)
    // }


    const handleReportPlotOpen = () => {
        setReport_plot_open(true);
    };

    const handleReportPlotClose = () => {
        setReport_plot_open(false);
    };


    useEffect(() => {


        try {
            tg.ready();
            tg.enableClosingConfirmation();
            tg.expand()
            tg.BackButton.show();
        } catch (e) {
            console.log('tg_err')
        }

    }, [])


    const dispatch = useDispatch();
    // const stations = useSelector(state => state.mapFlats);


    const uploadMetroInitial = useCallback(async (data) => {
        dispatch(setInitialStations(data.metro))
        dispatch(setInitialBrunches(data.brunches))
        dispatch(setInitialDistricts(data.districts))
    }, [dispatch])

    useEffect(() => {

        fetch('https://pyxi.pro/tg-web-app/get-metro').then(
            res => res.json()
        ).then(
            data => uploadMetroInitial(data)
        )

    }, [])
    // const [price_desc_modal_open, setPrice_desc_modal_open] = useState(false)
    // const handlePriceDescModal = () => {
    //     console.log('asdfadsf');
    //     setPrice_desc_modal_open(!price_desc_modal_open)
    // }



    const price_desc_modal_open = useSelector(state => state.mapFlats.app_params.price_desc_modal_open);
    const handlePriceDescModal = () => {
        dispatch(updateAppParam({ field: 'price_desc_modal_open', value: !price_desc_modal_open }))
    }
    return (
        <YMaps query={{ load: "package.full" }}>
            <div>
                <NavbarComp />
                <Button onClick={handleReportPlotOpen}>Open modal</Button>
                <Outlet handlePriceDescModal={handlePriceDescModal} />



                <Dialog
                    fullScreen
                    open={price_desc_modal_open}
                    keepMounted
                    onClose={handlePriceDescModal}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handlePriceDescModal}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Sound
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleReportPlotOpen}>
                                save
                            </Button> */}
                        </Toolbar>
                    </AppBar>
                    <Box

                    >
                        <Paper
                        className='m-3 p-2'
                        >

                            <Typography >
                                В ячейках таблицы указаны два числа.
                            </Typography>
                            <Typography className='mt-3' >
                                Например: <b>22.1% / 140</b>
                            </Typography>
                            <Typography className='mt-3' >
                                <b>Первое число в %, это - позиция объявления в классе</b>.
                            </Typography>

                            <Typography className='mt-3' >
                                Показывает сколько объектов этого класса можно купить за ту же цену.
                            </Typography>

                            <Typography className='mt-3' >
                                <b> Второе число - это количество объявлений в классе.</b>
                            </Typography>
                            {/* 
                    <Typography className='mt-3' >
                        Показывает насколько высока в нём конкуренция.
                    </Typography> */}

                            <hr />
                            <Typography className='mt-3' >
                                <b>22.1% / 140</b><br /> означает, что в классе 140 объявлений, и только 22% из них доступны в ту же цену.
                            </Typography>

                            <Typography className='mt-3' >
                                <b>100% / 95</b><br /> означает, что в классе 95 объявлений, и дороже нет ни одного.
                            </Typography>

                            <Typography className='mt-3' >
                                <b>0% / 38</b><br /> означает, что в классе 38 объявлений, и этот самый дешёвый из них.
                            </Typography>

                            <hr />
                            <Typography className='mt-3' >
                                Расчитывается на основе объявлений на Циане за прошедший день на момент публикации или изменения цены.
                            </Typography>
                            <Typography className='mt-3' >
                                Обновляется раз в неделю.
                            </Typography>
                        </Paper>
                    </Box>

                </Dialog>

                <Dialog
                    fullScreen
                    open={report_plot_open}
                    onClose={handleReportPlotClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleReportPlotClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Sound
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleReportPlotOpen}>
                                save
                            </Button> */}
                        </Toolbar>
                    </AppBar>
                    <Box
                        sx={{

                            // height:500,
                            // overflowX: 'auto',
                            // overflowY: 'auto'

                        }}
                    >
                        <Box
                            sx={{

                                // height:500,
                                overflowX: 'auto',
                                overflowY: 'auto'

                            }}
                        >
                            <img
                                style={{
                                    // width: '100vw',
                                    height: '70vh',


                                }}
                                alt={'asdfadf'}
                                src='https://img.pyxi.pro/stat/img/iwzkfyqcgckdkcibdstilluvozeodvty.png'
                            />
                        </Box>

                        <Typography >
                            В ячейках таблицы указаны два числа.
                        </Typography>
                        <Typography className='mt-3' >
                            Например: <b>22.1% / 140</b>
                        </Typography>
                        <Typography className='mt-3' >
                            <b>Первое число в %, это - позиция объявления в классе</b>.
                        </Typography>

                        <Typography className='mt-3' >
                            Показывает сколько объектов этого класса можно купить за ту же цену.
                        </Typography>

                        <Typography className='mt-3' >
                            <b> Второе число - это количество объявлений в классе.</b>
                        </Typography>
                        {/* 
                    <Typography className='mt-3' >
                        Показывает насколько высока в нём конкуренция.
                    </Typography> */}

                        <hr />
                        <Typography className='mt-3' >
                            <b>22.1% / 140</b><br /> означает, что в классе 140 объявлений, и только 22% из них доступны в ту же цену.
                        </Typography>

                        <Typography className='mt-3' >
                            <b>100% / 95</b><br /> означает, что в классе 95 объявлений, и дороже нет ни одного.
                        </Typography>

                        <Typography className='mt-3' >
                            <b>0% / 38</b><br /> означает, что в классе 38 объявлений, и этот самый дешёвый из них.
                        </Typography>

                        <hr />
                        <Typography className='mt-3' >
                            Расчитывается на основе объявлений на Циане за прошедший день на момент публикации или изменения цены.
                        </Typography>
                        <Typography className='mt-3' >
                            Обновляется раз в неделю.
                        </Typography>

                    </Box>

                </Dialog>


                {/* <Modal
                    keepMounted
                    open={report_plot_open}
                    onClose={handleReportPlotOpen}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box
                        sx={{

                            // height:500,
                            overflowX: 'auto',
                            overflowY: 'auto'

                        }}
                    >
                        <img
                            style={{
                                // width: '100vw',
                                height: '85vh'
                            }}
                            alt={'asdfadf'}
                            src='https://img.pyxi.pro/stat/img/iwzkfyqcgckdkcibdstilluvozeodvty.png'
                        />
                    </Box>
                </Modal> */}


            </div>

        </YMaps>
    )
        ;


    // <div className="App">
    //   <header className="App-header">
    //
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn Reactasdf asdf asdf asdf
    //     </a>
    //   </header>
    // </div>
    // );
}

export default App;

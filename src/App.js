import { useCallback, useEffect } from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css'
import 'dist/output.css'
// import NavbarComp from './compontents/NavbarComp'
import { Outlet } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";
import { setInitialBrunches, setInitialDistricts, setInitialStations, updateAppParam } from "./store/MapFlatsSlice";
import { Slide } from '@mui/material';
// import {Container} from "react-bootstrap";

import * as React from 'react';
import PriceDescModal from 'compontents/PriceDescModal';
import ReportPlotModal from 'compontents/ReportPlotModal';
import { action } from 'store';


import MyBottomNav from 'compontents/MyBottomNav';


const tg = window.Telegram.WebApp;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function App() {



    const price_desc_modal_open = useSelector(state => state.mapFlats.app_params.price_desc_modal_open);


    const handleReportPlotOpen = () => {
        dispatch(updateAppParam({ field: 'report_plot_open', value: true }))
    };

    const cancelGetReportPlot = () => { action('CancelGetReportPlot') };
    const handleReportPlotClose = () => {
        dispatch(updateAppParam({ field: 'report_plot_open', value: false }))
        dispatch(cancelGetReportPlot)
        dispatch(updateAppParam({ field: 'report_plot', value: { id: Math.random(), status: 'none' } }))

    };

    const handlePriceDescModal = () => {
        dispatch(updateAppParam({ field: 'price_desc_modal_open', value: !price_desc_modal_open }))
    }

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

    useEffect(() => {

        fetch('https://pyxi.pro/tg-web-app/get-metro').then(
            res => res.json()
        ).then(
            data => uploadMetroInitial(data)
        )

    }, [])

    const uploadMetroInitial = useCallback(async (data) => {
        dispatch(setInitialStations(data.metro))
        dispatch(setInitialBrunches(data.brunches))
        dispatch(setInitialDistricts(data.districts))
    }, [dispatch])


    // const [value, setValue] = React.useState(0);
    // console.log(value);
    return (
        <YMaps query={{ load: "package.full" }}>

            <div>
                <div style={{

                }}>
                    <Outlet
                        handlePriceDescModal={handlePriceDescModal}
                    />
                </div>
                <PriceDescModal
                    keepMounted={true}
                    price_desc_modal_open={price_desc_modal_open}
                    handlePriceDescModal={handlePriceDescModal}
                    Transition={Transition}
                />
                <ReportPlotModal
                    keepMounted={true}
                    handleReportPlotClose={handleReportPlotClose}
                    Transition={Transition}
                />

                <MyBottomNav />

            </div>

        </YMaps>
    )
        ;


}

export default App;

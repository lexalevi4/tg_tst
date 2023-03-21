import { useCallback, useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComp from './compontents/NavbarComp'
import { Outlet } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";
import { setInitialBrunches, setInitialDistricts, setInitialStations, updateAppParam } from "./store/MapFlatsSlice";
import {  Button, Slide  } from '@mui/material';
// import {Container} from "react-bootstrap";

import * as React from 'react';
import PriceDescModal from 'compontents/PriceDescModal';
import ReportPlotModal from 'compontents/ReportPlotModal';
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

                <PriceDescModal
                    price_desc_modal_open={price_desc_modal_open}
                    handlePriceDescModal={handlePriceDescModal}
                    Transition={Transition}
                />
                <ReportPlotModal
                    report_plot_open={report_plot_open}
                    handleReportPlotClose={handleReportPlotClose}
                    Transition={Transition}
                />
            </div>

        </YMaps>
    )
        ;


}

export default App;

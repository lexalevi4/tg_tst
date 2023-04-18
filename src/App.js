import { useCallback, useEffect } from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css'
import 'dist/output.css'
// import NavbarComp from './compontents/NavbarComp'
import { Outlet } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import { useDispatch } from "react-redux";
import { setInitialBrunches, setInitialDistricts, setInitialStations } from "./store/MapFlatsSlice";
// import { Slide } from '@mui/material';
// import {Container} from "react-bootstrap";

import * as React from 'react';



import MyBottomNav from 'compontents/MyBottomNav';


const tg = window.Telegram.WebApp;

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

function App() {




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
        <YMaps query={{
            load: "package.full",
            lang: "ru_RU",
            apikey: "e105999a-b1c1-4234-963f-21e492dca418"
        }}>



            <Outlet

            />

            <MyBottomNav />



        </YMaps>
    )
        ;


}

export default App;

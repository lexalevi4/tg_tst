import {React, useCallback, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComp from './compontents/NavbarComp'
import {Outlet} from "react-router-dom";
import {YMaps} from "@pbe/react-yandex-maps";
import {useDispatch} from "react-redux";
import {setInitialBrunches, setInitialDistricts, setInitialStations} from "./store/MapFlatsSlice";
import {Container} from "react-bootstrap";


const tg = window.Telegram.WebApp;

function App() {

    // return (


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


    return (
        <YMaps query={{load: "package.full"}}>
            <div>
                <NavbarComp/>

                <Outlet/>

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

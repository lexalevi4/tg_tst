import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
// import store from "./store";
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
import { StyledEngineProvider } from '@mui/material/styles';



const root = ReactDOM.createRoot(document.getElementById('root'));


const CurrVersion = 3;

if (Number(localStorage.getItem('appVersion')) !== CurrVersion) {
    localStorage.setItem('appVersion', CurrVersion)
    persistor.purge()
}




root.render(
    // <React.StrictMode>
    <StyledEngineProvider injectFirst>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>

                <App />

            </PersistGate>
        </Provider>
    </StyledEngineProvider>
    // </React.StrictMode>
);

// reportWebVitals();

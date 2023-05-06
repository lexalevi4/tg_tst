import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
// import store from "./store";
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
import { StyledEngineProvider } from '@mui/material/styles';
import Loading from 'compontents/Loading';



const root = ReactDOM.createRoot(document.getElementById('root'));


const CurrVersion = 7;

if (Number(localStorage.getItem('appVersion')) !== CurrVersion) {
    localStorage.setItem('appVersion', CurrVersion)
    persistor.purge()

    if ('caches' in window) {
        caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach(name => {
                caches.delete(name);
            })
        });
        window.location.reload(true);
    }
}


root.render(
    // <React.StrictMode>
    <StyledEngineProvider injectFirst>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Suspense fallback={<Loading />}>
                    <App />
                </Suspense>
            </PersistGate>
        </Provider>
    </StyledEngineProvider>
    // </React.StrictMode>
);

// reportWebVitals();

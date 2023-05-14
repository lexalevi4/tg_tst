import { useDispatch, useSelector } from "react-redux";
import { action } from "store";
import { updateAppParam, updateSearch } from "store/MapFlatsSlice";

// import { Pagination, Paper, Typography } from "@mui/material";

import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import FlatCardMu from "./FlatCardMu";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


// import PriceDescModal from "./PriceDescModal";
// import ReportPlotModal from "./ReportPlotModal";


import Loading from "./Loading";
import NotFound from "./NotFound";
import { lazy, useState } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";


const ReportPlotModal = lazy(() => import('./ReportPlotModal'));
const PriceDescModal = lazy(() => import('./PriceDescModal'));

const FlatCardMu = lazy(() => import('./FlatCardMu'));


function FlatListMu({ data, isLoading, dispatch, page, per_page = 10, fav = false }) {
    // const per_page = 10;
    dispatch = useDispatch();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }


    const [cleanOpen, setCleanOpen] = useState(false);
    const handleCleanClose = () => {
        setCleanOpen(false)
    }
    const handleCleanOpen = () => {
        setCleanOpen(true)
    }

    const cleanFav = () => {
        console.log('clean_fav')


        try {
            if (window.Telegram.WebApp.initData !== null && window.Telegram.WebApp.initData !== '') {
                fetch('https://pyxi.pro/tg-web-app/clean-fav', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tg_data: window.Telegram.WebApp.initData || null
                    })
                }).then(
                    function () {
                        dispatch(updateAppParam({ field: 'fav_count', value: 0 }))
                        dispatch(updateSearch({ field: 'update', value: Date.now() }))
                        handleCleanClose()

                    }
                )
            } else {
                // console.log('Иди на хуй)')
                // setIsFav(!isFav)
            }
        } catch (e) {

        }

    }


    const sendFav = () => {
        // console.log('send_fav')
        setSnackbarOpen(true);
        try {
            if (window.Telegram.WebApp.initData !== null && window.Telegram.WebApp.initData !== '') {
                fetch('https://pyxi.pro/tg-web-app/send-all-fav', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        flat: 0,
                        fav: 1,
                        tg_data: window.Telegram.WebApp.initData || null
                    })
                }).then(
                    // setIsFav(!isFav)
                )
            } else {
                // console.log('Иди на хуй)')
                // setIsFav(!isFav)
            }
        } catch (e) {

        }

    }

    const handlePage = (event, value) => {
        if (!fav) {
            dispatch(updateSearch({ field: 'page', value: value }))
        } else {
            dispatch(updateSearch({ field: 'fav_page', value: value }))
        }
        window.scrollTo(0, 0)
    }

    const price_desc_modal_open = useSelector(state => state.mapFlats.app_params.price_desc_modal_open);
    const metro = useSelector(state => state.mapFlats.params.metro);

    // console.log(metro)

    const cancelGetReportPlot = () => { action('CancelGetReportPlot') };
    const handleReportPlotClose = () => {
        dispatch(updateAppParam({ field: 'report_plot_open', value: false }))
        dispatch(cancelGetReportPlot)
        dispatch(updateAppParam({ field: 'report_plot', value: { id: Math.random(), status: 'none' } }))

    };

    const handlePriceDescModal = () => {
        dispatch(updateAppParam({ field: 'price_desc_modal_open', value: !price_desc_modal_open }))
    }


    if (isLoading) {

        return (<Loading />)
    }

    if (data.flats.length === 0) {
        return (<NotFound />)
    }

    return (
        <>
            <Paper
                key={'flat_list'}
            >

                {
                    fav && (<>

                        <Paper className="grid grid-flow-col justify-stretch mb-3">
                            <Button
                                className='mr-1 '
                                // fullWidth
                                variant='contained'
                                startIcon={<DeleteIcon />}
                                onClick={handleCleanOpen}
                                color="error"
                            >
                                Очистить
                            </Button>
                            <Button
                                className='ml-1 '
                                // fullWidth
                                color="success"
                                variant='contained'
                                onClick={sendFav}
                                startIcon={<SendIcon />}
                            >
                                Отправить в чат
                            </Button>
                        </Paper>
                    </>)
                }
                <Paper
                    className="p-2 text-right mt-5"
                >
                    <Typography variant="body2" color="text.secondary">
                        Показано: {(((page - 1) * per_page) + 1)}- {(((page - 1) * per_page) + data.flats.length)} из {data.total_count}
                    </Typography>
                </Paper>
                {
                    data.flats.map(function (flat) {

                        return (<FlatCardMu handlePriceDescModal={handlePriceDescModal} key={'flat_card_' + flat.id} flat={flat} metro={metro} fav={fav} dispatch={dispatch} />)
                    })
                }
            </Paper>
            <Paper >
                <Pagination
                    className="mt-5 py-2"

                    count={Math.ceil(data.total_count / per_page)} page={page}
                    onChange={handlePage}
                />
                <div
                    style={{
                        marginBottom: 80
                    }}
                >
                </div>
            </Paper>



            <PriceDescModal
                keepMounted={true}
                price_desc_modal_open={price_desc_modal_open}
                handlePriceDescModal={handlePriceDescModal}
            // Transition={Transition}
            />
            <ReportPlotModal
                keepMounted={true}
                handleReportPlotClose={handleReportPlotClose}
            // Transition={Transition}
            />


            <Dialog
                open={cleanOpen}
                onClose={handleCleanClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Очистить избранное?"}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        Оно будет очищено.
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={cleanFav} autoFocus>
                        Да
                    </Button>
                    <Button onClick={handleCleanClose}>Нет</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                // className='mb-10'
                style={{
                    marginBottom: '60px'
                }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            // style={}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Отправлено
                </Alert>
            </Snackbar>

        </>
    )
}



export default FlatListMu;
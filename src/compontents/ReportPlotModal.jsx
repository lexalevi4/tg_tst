import { AppBar, Box, Button, Dialog, IconButton, Modal, Paper, Toolbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch } from "react-redux";
import { useGenerateReportPlotQuery } from "store/PyxiApi";
import PositionsTable from "./PositionsTable";
import { useState } from "react";
import { ModalClose, Sheet } from "@mui/joy";
import ReportPlotModalContent from "./ReportPlotModalContent";
import { useDispatch, useSelector } from "react-redux";
import { action } from "store/index";
import Loading from "./Loading";

const ReportPlotModal = function ({ handleReportPlotClose, Transition }) {

    let ready = false;

    const [statPlotOpen, setStatPlotOpen] = useState(false);

    const openStatPlotModal = () => { setStatPlotOpen(true) }
    const closeStatPlotModal = () => { setStatPlotOpen(false) }


    const report_plot_open = useSelector(state => state.mapFlats.app_params.report_plot_open);
    const report_plot_request = useSelector(state => state.mapFlats.app_params.report_plot_request);

    const areEqual = (oldValue, newValue) => (oldValue.id === newValue.id && oldValue.status === newValue.status)
    const data = useSelector(state => state.mapFlats.app_params.report_plot, areEqual);

    // const data = {}
    const dispatch = useDispatch();


    const generatePlot = () => { action('GetReportPlot') };
    if (report_plot_open && data.status === 'none') {
        dispatch(generatePlot)
    }



    const cols = [
        'Класс',
        'Количество',
        'Позиция',
        'Среднее',
        'min',
        '25%',
        '50%',
        '75%',
        'max',

    ]



    if (data?.status === 'ready') {
        ready = true;
    } else {
        ready = false;
    }

    const renderSwitch = function (param) {

        switch (param) {
            case 'pending':
                return (<Loading/>);
            case 'none':
                return (<Loading/>);
            case 'ready':
                return (<ReportPlotModalContent cols={cols} data={data} openStatPlotModal={openStatPlotModal} />);
            default:
                return (<h1>Ошибка</h1>);
        }
    }



    return (





        <Dialog
            fullScreen
            open={report_plot_open}
            scroll='paper'
            onClose={handleReportPlotClose}
            TransitionComponent={Transition}
        >



            <Box
            >
                <Sheet>


                    {renderSwitch(data.status)}

                    {/* {!ready ? (<h1>Loading</h1>) : (<ReportPlotModalContent cols={cols} data={data} openStatPlotModal={openStatPlotModal} />)} */}





                </Sheet>
            </Box>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <IconButton
                        // sx={{
                        //     right: 0
                        // }}
                        edge="start"
                        color="inherit"
                        onClick={handleReportPlotClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>


            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={statPlotOpen}
                onClose={() => setStatPlotOpen(false)}
                sx={{ height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '', }}
            >
                <Sheet
                    // variant="outlined"
                    sx={{
                        // maxWidth: 500,
                        borderRadius: 'md',
                        // p: 3,
                        // boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        onClick={closeStatPlotModal}
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />

                    <img
                        // className='m-2 mb-5'
                        style={{
                            m: 3,
                            width: '95vw',
                            // height: '40vh',


                        }}
                        alt={'asdfadf'}
                        src={'https://img.pyxi.pro/stat/img/static/16780ONRsKEnoK9f62.png '}
                    />

                </Sheet>
            </Modal>


        </Dialog>
    );
}

export default ReportPlotModal
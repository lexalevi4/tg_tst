import { AppBar, Box, Dialog, IconButton, Modal, Paper, Toolbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch } from "react-redux";
// import { useGenerateReportPlotQuery } from "store/PyxiApi";
// import PositionsTable from "./PositionsTable";
// import { useState } from "react";
import { Sheet } from "@mui/joy";
import ReportPlotModalContent from "./ReportPlotModalContent";
import { useDispatch, useSelector } from "react-redux";
import { action } from "store/index";
import Loading from "./Loading";
import { updateAppParam } from "store/MapFlatsSlice";
import StatPlotModalContent from "./StatPlotModalContent";
import { stopStatPlot } from "saga/actions";
// import { width } from "@mui/system";


// const getReportPlotRequest = (state) => state.mapFlats.app_params.report_plot_request

const getReportPlot = (state) => state.mapFlats.app_params.report_plot
const getReportPlotOpen = (state) => state.mapFlats.app_params.report_plot_open

const getStatPlot = (state) => state.mapFlats.app_params.stat_plot
const getStatPlotOpen = (state) => state.mapFlats.app_params.stat_plot_open

const ReportPlotModal = function ({ handleReportPlotClose, Transition }) {

    // let ready = false;

    // const [statPlotOpen, setStatPlotOpen] = useState(false);

    // const openStatPlotModal = () => { setStatPlotOpen(true) }
    // const closeStatPlotModal = () => { setStatPlotOpen(false) }


    const report_plot_open = useSelector(getReportPlotOpen);
    // const report_plot_request = useSelector(getReportPlotRequest);

    const areEqual = (oldValue, newValue) => (oldValue.id === newValue.id && oldValue.status === newValue.status)
    const data = useSelector(getReportPlot, areEqual);

    const stat_plot_data = useSelector(getStatPlot, areEqual);

    const setStatPlotOpen = function (value) {
        dispatch(updateAppParam({ field: 'stat_plot_open', value: value }))
    }

    const closeStatPlotModal = function () {
        setStatPlotOpen(false);
        dispatch(stopStatPlot)
        dispatch(updateAppParam({ field: 'stat_plot', value: { status: 'none', 'id': 0, filename: '' } }))
    }
    const statPlotOpen = useSelector(getStatPlotOpen);

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



    // if (data?.status === 'ready') {
    //     const ready = true;
    // } else {
    //     const ready = false;
    // }

    const renderSwitch = function (param) {

        switch (param) {
            case 'pending':
                return (<Loading />);
            case 'none':
                return (<Loading />);
            case 'ready':
                return (<ReportPlotModalContent cols={cols} data={data} closeStatPlotModal={closeStatPlotModal}
                //     plot_data={{
                //     x: data.x,
                //     hue: data.hue,
                //     param: data.param,
                //     dataset: data.dataset,
                //     district: data.district,
                //     okrug: data.okrug
                // }}
                />);
            default:
                return (<h1>Ошибка</h1>);
        }
    }



    const statPlotSwitch = function (param) {

        switch (param) {
            case 'pending':
                return (
                    <Paper
                        sx={{
                            height: '40vh',
                            width: '100vw'
                        }}
                    >
                        <Loading />
                    </Paper>
                );
            case 'none':
                return (
                    <Paper
                        sx={{
                            height: '40vh',
                            width: '100vw'
                        }}
                    >
                        <Loading />
                    </Paper>
                );
            case 'ready':
                return (<StatPlotModalContent filename={stat_plot_data.filename} closeStatPlotModal={closeStatPlotModal}
                //     plot_data={{
                //     x: data.x,
                //     hue: data.hue,
                //     param: data.param,
                //     dataset: data.dataset,
                //     district: data.district,
                //     okrug: data.okrug
                // }}
                />);
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
                <Sheet
                    style={{
                        marginTop: 80
                    }}
                >
                    {renderSwitch(data.status)}
                </Sheet>
            </Box>
            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
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
                onClose={closeStatPlotModal}
                sx={{ height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '', }}
            >
                <Sheet
                    // variant="outlined"
                    sx={{
                        // maxWidth: 500,
                        borderRadius: 'md',
                        minHeight: 150,
                        p: 1,
                        boxShadow: 'lg',
                    }}
                >
                    {statPlotSwitch(stat_plot_data.status)}
                </Sheet>
            </Modal>


        </Dialog>
    );
}

export default ReportPlotModal
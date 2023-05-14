import Sheet from "@mui/joy/Sheet";


import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

// import PositionsTable from "./PositionsTable";
import { useState } from "react";
import { lazy } from "react";
import FlatParamsTable from "./FlatParamsTable";
import { shallowEqual, useSelector } from "react-redux";
// import ReportDescModal from "./ReportDescModal";
// import { useSpring } from "@react-spring/web";
import HelpIcon from '@mui/icons-material/Help';

const ReportDescModal = lazy(() => import('./ReportDescModal'));
const PositionsTable = lazy(() => import('./PositionsTable'));

function ReportPlotModalContent({ cols, data }) {

    const [zoomed, setZommed] = useState(true)
    const flat = useSelector(state => state.mapFlats.app_params.report_flat, shallowEqual);

    const [report_desc_modal_open, setReportDescModalOpen] = useState(false)


    const openReportDescModal = () => {
        console.log('saf');
        setReportDescModalOpen(true);
    }


    return (
        <>

            <Sheet
                // className="p-3"

                style={{
                    // marginTop: 80,
                    marginBottom: 95
                }}
            >
                <Paper
                    onClick={() => setZommed(!zoomed)}

                    className='m-3 p-2'
                    style={{
                        height: '70wh',
                        justifyContent: 'center',
                        overflowX: 'auto',
                        overflowY: 'auto'
                    }}
                >

                    <img
                        className='m-2'
                        style={{
                            width: zoomed ? '95%' : '250%',
                        }}
                        alt={'Боксплот'}
                        src={'https://img.pyxi.pro/stat/img/' + data.img}
                        loading="lazy"
                    />
                    <Divider
                        className="my-2"
                    />
                    <img
                        className='m-2'
                        style={{
                            width: zoomed ? '95%' : '250%',
                        }}
                        alt={'Гистограмма'}
                        src={'https://img.pyxi.pro/stat/img/' + data.img_2}
                        loading="lazy"
                    />

                </Paper>
                <Paper

                    className='m-3 p-2'
                    sx={{

                        // height:500,
                        overflowX: 'auto',
                        overflowY: 'auto'

                    }}
                >


                    <Button
                        style={{
                            textTransform: 'none',
                        }}
                        onClick={openReportDescModal}
                    >
                         <HelpIcon size='8px' /> Пояснительная бригада
                        </Button>
                </Paper>
                <Paper

                    className='m-3 p-2'
                    sx={{

                        // height:500,
                        overflowX: 'auto',
                        overflowY: 'auto'

                    }}
                >
                    <FlatParamsTable flat={flat} />
                </Paper>




                <Paper

                    className='m-3 p-2'
                    sx={{
                        overflowX: 'auto',
                        overflowY: 'auto'
                    }}
                >
                    <PositionsTable cols={cols} data={data.plot_data.full}
                    // plot_data={{

                    // }}
                    />
                </Paper>



            </Sheet>

            <ReportDescModal report_desc_modal_open={report_desc_modal_open} setReportDescModalOpen={setReportDescModalOpen} openReportDescModal={openReportDescModal} />
        </>
    );
}

export default ReportPlotModalContent;
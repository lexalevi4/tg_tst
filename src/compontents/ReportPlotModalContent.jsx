import { Sheet } from "@mui/joy";
import { Button, Paper } from "@mui/material";
import PositionsTable from "./PositionsTable";

function ReportPlotModalContent({ cols, data,openStatPlotModal }) {
    return (

        <Sheet>





            <Paper

                className='m-3 p-2'
                sx={{

                    // height:500,
                    overflowX: 'auto',
                    overflowY: 'auto'

                }}
            >
                <img
                    className='m-2'
                    style={{
                        // width: '100vw',
                        height: '70vh',





                    }}
                    alt={'asdfadf'}
                    src={'https://img.pyxi.pro/stat/img/' + data.img}
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
                    onClick={openStatPlotModal}
                >Открыть модалку</Button>

            </Paper>

            <Paper

                className='m-3 p-2'
                sx={{

                    // height:500,
                    overflowX: 'auto',
                    overflowY: 'auto'

                }}
            >

                <PositionsTable cols={cols} data={data.plot_data.full} />


            </Paper>



        </Sheet>

    );
}

export default ReportPlotModalContent;
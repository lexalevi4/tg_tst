import { AppBar, Box, Button, Dialog, IconButton, Modal, Paper, Toolbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch } from "react-redux";
import { useGenerateReportPlotQuery } from "store/PyxiApi";
import PositionsTable from "./PositionsTable";
import { useState } from "react";
import { ModalClose, Sheet } from "@mui/joy";

const ReportPlotModal = function ({ report_plot_open, handleReportPlotClose, Transition }) {




    const [statPlotOpen, setStatPlotOpen] = useState(false);

    const openStatPlotModal = () => { setStatPlotOpen(true) }
    const closeStatPlotModal = () => { setStatPlotOpen(false) }

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

    const plot_data = {
        id: 234
    }

    const { data, isLoading } = useGenerateReportPlotQuery(plot_data)

    // const dispatch = useDispatch();
    // const handlePage = (event, value) => {
    //     dispatch(updateSearch({ field: 'page', value: value }))
    //     window.scrollTo(0, 0)
    // }


    // console.log(data.plot_data.full);




    if (isLoading) {

        return (<h1>Loading</h1>)
    }


    // const mapped = Object.entries(data.plot_data.full);

    // const rows = [];

    // mapped.map(([k, v]) => {

    //     rows.push(
    //         {
    //             row: [v.name, v.total_count, v.current_position, v.mean, v.min, v.q25, v.q50, v.q75, v.max],
    //             child: v.full || null,
    //             active: v.is_active
    //         }
    //     )
    //     return true;
    // });
    // console.log(rows)




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
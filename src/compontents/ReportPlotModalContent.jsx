import Sheet from "@mui/joy/Sheet";


import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

// import PositionsTable from "./PositionsTable";
import { useState } from "react";
import { lazy } from "react";
// import { useSpring } from "@react-spring/web";

const PositionsTable = lazy(() => import('./PositionsTable'));

function ReportPlotModalContent({ cols, data, openStatPlotModal, plot_data = {} }) {

    const [zoomed, setZommed] = useState(true)
    // const { transform, opacity } = useSpring({
    //   opacity: flipped ? 1 : 0,
    //   transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    //   config: { mass: 5, tension: 500, friction: 80 },
    // })


    return (

        <Sheet

            style={{
                marginBottom: 95
            }}
        >







            <Paper
                onClick={() => setZommed(!zoomed)}

                className='m-3 p-2'
                style={{
                    // width: '95vw',
                    height: '70wh',
                    justifyContent: 'center',
                    overflowX: 'auto',
                    overflowY: 'auto'
                }}
            // sx={{

            //     // height:500,
            //     overflowX: 'auto',
            //     overflowY: 'auto'

            // }}
            >



                <img
                    className='m-2'
                    style={{
                        width: zoomed ? '95%' : '250%',
                    }}
                    alt={'Боксплот'}
                    src={'https://img.pyxi.pro/stat/img/' + data.img}
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
                />


            </Paper>
            {/* <Paper

                className='m-3 p-2'
                style={{
                    height: '70vh',
                    justifyContent: 'center',
                    overflowX: 'auto',
                    overflowY: 'auto'
                }}
            // sx={{

            //     // height:500,
            //     overflowX: 'auto',
            //     overflowY: 'auto'

            // }}
            >
               



            </Paper> */}

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

                <PositionsTable cols={cols} data={data.plot_data.full}



                    plot_data={{

                    }}
                />


            </Paper>



        </Sheet>

    );
}

export default ReportPlotModalContent;
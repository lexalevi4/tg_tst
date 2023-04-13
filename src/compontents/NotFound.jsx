// import * as echarts from 'echarts';

// import { Paper } from '@mui/material';
import ReactECharts from 'echarts-for-react';
// const { useEffect } = require("react");



const NotFound = function () {


    // useEffect(() => {


    //     var chartDom = document.getElementById('scatter');

    //     var myChart = echarts.init(chartDom);
    //     var option;

    const option = {
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: 'Ничего \nне найдено \n:(',
                        fontSize: 40,
                        
                        // align:'justify',
                        fontWeight: 'bold',
                        lineDash: [0, 200],
                        lineDashOffset: 0,
                        fill: 'transparent',
                        stroke: '#000',
                        lineWidth: 1
                    },
                    keyframeAnimation: {
                        duration: 4000,
                        // loop: true,
                        keyframes: [
                            {
                                percent: 0.5,
                                style: {
                                    fill: 'transparent',
                                    lineDashOffset: 200,
                                    lineDash: [200, 0]
                                }
                            },
                            {
                                // Stop for a while.
                                percent: 0.7,
                                style: {
                                    fill: 'transparent'
                                }
                            },
                            {
                                percent: 0.9,
                                style: {
                                    fill: 'black'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
    //     myChart.setOption(option);
    // })



    return (
        <div className='echarts'>
            {/* <Paper> */}
                <ReactECharts option={option} />
                {/* <div id="scatter" className='chart'></div> */}
            {/* </Paper> */}
        </div>

    );
}

export default NotFound;
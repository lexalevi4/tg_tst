// import * as echarts from 'echarts';

// import { Paper } from '@mui/material';
import ReactECharts from 'echarts-for-react';
// const { useEffect } = require("react");



const Loading = function () {


        const option = {
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: 'ТурбоБрокер',
                        fontSize: 40,
                        fontWeight: 'bold',
                        lineDash: [0, 200],
                        lineDashOffset: 0,
                        fill: 'transparent',
                        stroke: '#000',
                        lineWidth: 1
                    },
                    keyframeAnimation: {
                        duration: 3000,
                        loop: true,
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
                <ReactECharts option={option} />
        </div>

    );
}

export default Loading;
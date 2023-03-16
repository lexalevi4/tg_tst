import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import {Radar} from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const PositionsRadar = function (plot_data) {

    // console.log(plot_data)

    const data = {
        labels: plot_data.plot_data.labels,
        options: {
            elements: {
                line: {
                    // borderWidth: 38
                }
            }
        },
        datasets: [
            {
                label: 'Район',
                data: plot_data.plot_data.district,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Округ',
                data: plot_data.plot_data.okrug,
                backgroundColor: 'rgba(0,149,255,0.2)',
                borderColor: 'rgb(0,13,255)',
                borderWidth: 1,
            },
            {
                label: 'Москва',
                data: plot_data.plot_data.town,
                backgroundColor: 'rgba(0,255,21,0.3)',
                borderColor: 'rgb(36,77,52)',
                borderWidth: 1,
            },
        ],

    };


    const chartOptions = {

        plugins: {

            title: {
                // display: true,
                // align: "start",
                // text: "Comparing Student Performance"
            },
            legend: {
                // align: "start",
                font: {
                    size: 44
                }
            }
        },
        ticks: {
            stepSize: 25,
            font: {
                size: 7
            },
            backdropPadding: {
                x: 10,
                y: 40
            }
        },
        elements: {
            line: {
                borderWidth: 1

            },
            point: {
                radius: 1
            }
        },
        scales: {
            r: {
                min: 0,
                max: 100,
                beginAtZero: true,
                pointLabels: {
                    font: {
                        size: 9
                    }
                }
            }
        }
    };

    // console.log(data)
    return (<>
        <Radar
            data={data}
            options={chartOptions}
        />
    </>)
}


export default PositionsRadar;

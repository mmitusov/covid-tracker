import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'; //Without that <Line /> chart is not gonna work
import numeral from 'numeral'

const LineGraph = ({caseType = 'cases'}) => {
    Chart.register(...registerables); //Without that <Line /> chart is not gonna work
    const [caseHistory, setCaseHistory] = useState({})

    useEffect(() => {
        (async() => {
            const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            const data = await res.json()
            const chartData = buildChartData(data, caseType)
            setCaseHistory(chartData)
            console.log(data)
        })()
    }, [])

    function buildChartData (rawData, caseType) {
        //Obj 'rawData' holds 3 diff arrays. Name of arr to loop trough we'll pass with 'caseType'
        const chartData = [];
        let lastDataPoint;

        Object.keys(rawData[caseType]).forEach((date) => {
            const newDataPoint = {
                x: date, //Date point
                y: rawData[caseType][date] - lastDataPoint //New daily cases = curr case num - prev case num
            }
            chartData.push(newDataPoint)
            lastDataPoint = rawData[caseType][date]
        })
        return chartData;
    }

    const lineData = {
        datasets: [
            {
                data: caseHistory,
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",
            },
        ],
    }

    const lineOptions = {
        plugins: {
            legend: {
                display: false,
            }
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    };

    if (Object.keys(caseHistory).length <= 0) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <Line 
                data={lineData}
                options={lineOptions}
                height={200}
            />
        </div>
  )
}

export default LineGraph
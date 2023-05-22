import React from 'react'
import { Card, Button } from 'components/ui'
import { Chart } from 'components/shared'
import { COLOR_1 } from 'constants/chart.constant'
const SalesReport = ({ className, dataA = {} }) => {

    const data = [
        {
            name: 'STOCK ABC',
            data: [
                0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
            ],
        },
    ]

    return (
        <Card className={className}>
            <div className="flex items-center justify-between">
                <h4>จำนวนคนที่ออนไลน์เกมส์</h4>
            </div>
            <Chart
                options={{
                    chart: {
                        zoom: {
                            enabled: false,
                        },
                    },
                    colors: [COLOR_1],
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            stops: [0, 80, 100],
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3,
                    },
                    labels: [
                        '0.00',
                        '1.00',
                        '2.00',
                        '3.00',
                        '4.00',
                        '5.00',
                        '6.00',
                        '7.00',
                        '8.00',
                        '9.00',
                        '10.00',
                        '11.00',
                        '12.00',
                        '13.00',
                        '14.00',
                        '15.00',
                        '16.00',
                        '17.00',
                        '18.00',
                        '19.00',
                        '20.00',
                        '21.00',
                        '22.00',
                        '23.00',
                    ],
                    xaxis: {
                        type: 'time',
                    },
                    yaxis: {
                        opposite: true,
                    },
                    legend: {
                        horizontalAlign: 'left',
                    },
                }}
                type="area"
                series={data}
                height={300}
            />
        </Card>
    )
}

export default SalesReport

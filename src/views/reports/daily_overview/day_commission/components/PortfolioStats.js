import React, { useState } from 'react'
import { Card, Segment } from 'components/ui'
import { Chart } from 'components/shared'
import NumberFormat from 'react-number-format'
import isEmpty from 'lodash/isEmpty'
import { COLORS } from 'constants/chart.constant'

const PortfolioStats = ({dataA, className }) => {

    /*const dataA = [
        {
            data: data
        },
    ]*/

    const data = [
        {
            name: 'เมษา',
            data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'พฤษภาคม',
            data: [11, 32, 45, 32, 34, 52, 41],
        },
    ]

    return (
        <Card className={className}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div>
                    <h4>ค่าคอมมิชชั่นรายวัน</h4>
                </div>
            </div>
            <Chart
            options={{
                dataLabels: {
                    enabled: false,
                },
                colors: COLORS,
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    categories: [
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10',
                        '11',
                        '12',
                        '13',
                        '14',
                        '15',
                        '16',
                        '17',
                        '18',
                        '19',
                        '20',
                        '21',
                        '22',
                        '23',
                        '24',
                        '25',
                        '26',
                        '27',
                        '28',
                        '29',
                        '30',
                        '31',
                    ],
                },
            }}
            series={data}
            type="area"
            height={300}
        />
        </Card>
    )
}

export default PortfolioStats

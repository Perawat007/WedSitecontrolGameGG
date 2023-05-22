import React, { useState } from 'react'
import { Card, Segment } from 'components/ui'
import { Chart } from 'components/shared'
import NumberFormat from 'react-number-format'
import isEmpty from 'lodash/isEmpty'
import { COLOR_2 } from 'constants/chart.constant'

const PortfolioStats = ({ data, className }) => {

    const dataA = [
        {
            data: data
        },
    ]

    return (
        <Card className={className}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div>
                    <h4>ค่าคอมมิชชั่นรายเดือน</h4>
                </div>
            </div>
            {!isEmpty(dataA) && (
                <Chart
                options={{
                    chart: {
                        type: 'line',
                        zoom: {
                            enabled: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3,
                    },
                    colors: [COLOR_2],
                    xaxis: {
                        categories: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                        ],
                    },
                }}
                series={dataA}
                height={300}
            />
            )}
        </Card>
    )
}

export default PortfolioStats

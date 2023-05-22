import React from 'react'
import { Card, Avatar } from 'components/ui'
import NumberFormat from 'react-number-format'
import { GrowShrinkTag } from 'components/shared'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import {
    HiOutlineUserGroup,
} from 'react-icons/hi'

const StatisticCard = ({ data = {},avatarClass , label, valuePrefix, date }) => {
    return (
        <Card>
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                    <Avatar
                    size={50}
                    className={avatarClass}
                    icon={<HiOutlineUserGroup />}
                />
                &nbsp;
                &nbsp;
                        <NumberFormat
                            displayType="text"
                            value={data}
                            thousandSeparator
                            prefix={valuePrefix}
                        />
                    </h3>
                    <br/>
                    <p>
                        จำนวนสมาชิกทั้งหมดในวันที่ {''}
                        <span className="font-semibold">
                            {dayjs(date).format('DD MMM')}
                        </span>
                    </p>
                </div>
                <GrowShrinkTag value={50} suffix="%" />
            </div>
        </Card>
    )
}

const Statistic = ({ data = {} }) => {
    const startDate = useSelector(
        (state) => state.salesDashboard.state.startDate
    )
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                data={data.dataAdmin}
                avatarClass="!bg-indigo-600"
                label="Admin จำนวน / คน"
                tagSuffix="%"
                date={startDate}
            />
            <StatisticCard
                data={data.dataAgent}
                avatarClass="!bg-blue-500"
                label="Agent จำนวน / คน"
                tagSuffix="%"
                date={startDate}
            />
            <StatisticCard
                data={data.dataMember}
                avatarClass="!bg-emerald-500"
                label="Member จำนวน / คน"
                tagSuffix="%"
                date={startDate}
            />
        </div>
    )
}

export default Statistic

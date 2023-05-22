import React from 'react'
import { Card, Avatar, Button } from 'components/ui'
import { GrowShrinkTag } from 'components/shared'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    HiOutlineUserGroup,
} from 'react-icons/hi'
import dayjs from 'dayjs'
const HoldingCard = ({ data = {} }) => {

    return (
        <Card className="bg-gray-50 dark:bg-gray-700 border-0">
            <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-3">
                    <Avatar
                        className="bg-transparent"
                        src={data.icon}
                        shape="circle"
                    />
                    <div>
                        <h6 className="font-bold">{data.namegame}</h6>
                    </div>
                </div>
                <div className="text-right rtl:text-left">
                    <h6 className="mb-2">
                    <span>เล่น </span>
                        <NumberFormat
                            displayType="text"
                            value= {data.play}
                            suffix="     ครั้ง"
                            thousandSeparator={true}
                        />
                    </h6>

                    <h6 className="mb-2">
                    <span>รวมBet </span>
                        <NumberFormat
                            displayType="text"
                            value= {data.bet}
                            suffix="     บาท"
                            thousandSeparator={true}
                        />
                    </h6>
                    <span>รวม Win </span>
                    <GrowShrinkTag value={data.bet} suffix="บาท" />
                </div>
            </div>
        </Card>
    )
}

const StatisticCard = ({ data ,avatarClass , label, valuePrefix, date }) => {
    return (
        <Card className="bg-gray-50 dark:bg-gray-700 border-0">
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
                    value= {data}
                    suffix="     users"
                    thousandSeparator={true}
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

const Holding = ({ data = [], dataview }) => {
    const navigate = useNavigate()
    const startDate = useSelector(
        (state) => state.cryptoDashboard.state.startDate
    )

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h4>รายงานภาพรวมรายวัน</h4>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                {data.map((holding) => (
                    <HoldingCard key={holding.id} data={holding} />
                ))}

            <StatisticCard
                data={dataview.dataMember}
                avatarClass="!bg-emerald-500"
                label="Member จำนวน / คน"
                tagSuffix="%"
                date={startDate}
            />      
            <StatisticCard
                data={dataview.dataAgent}
                avatarClass="!bg-indigo-600"
                label="Agent จำนวน / คน"
                tagSuffix="%"
                date={startDate}
            />      
            </div>
        </Card>
    )
}

export default Holding

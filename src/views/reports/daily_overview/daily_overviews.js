import React, { useEffect, useState } from 'react'
import { Loading } from 'components/shared'
import PortfolioStats from './components/PortfolioStats'
import FastTrade from './components/FastTrade'
import Holding from './components/Holding'
import MarketValue from './components/MarketValue'
import reducer from './store'
import { injectReducer } from 'store/index'
import { getCryptoDashboardData } from './store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker } from 'components/ui'
import DayCommission from './day_commission/indexday'
injectReducer('dailyDashboard', reducer)

const Daily_overview = () => {
    const dispatch = useDispatch()
    const [dateValue, setDateValue] = useState(new Date())
    const {
        dataGame, logGame, logDayGame, data,
    } = useSelector((state) => state.dailyDashboard.data.dashboardData)

    const statisticData = useSelector((state) => state.dailyDashboard.data.dashboardData)
    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-US");
        const [day, month, year] = formattedDate.split('/');
        const formattedDay = day.padStart(2, '0');
        const formattedMonth = month.padStart(2, '0');
        const formattedDateB = `${year}-${formattedDay}-${formattedMonth}`;
        fetchData(formattedDateB)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = (formattedDateB) => {
        dispatch(getCryptoDashboardData(formattedDateB));
    }

    const onCertainPeriodChange = (date) => {
        const dateString = new Date(date);
        const formattedDate = dateString.toLocaleDateString("en-US");
        const [day, month, year] = formattedDate.split('/');
        const formattedDay = day.padStart(2, '0');
        const formattedMonth = month.padStart(2, '0');
        const formattedDateB = `${year}-${formattedDay}-${formattedMonth}`;
        setDateValue(formattedDateB);
        fetchData(formattedDateB);
    }

    const disableCertainDate = (date) => {
        const banDate = [0]
        return banDate.includes(date.getDate())
    }

    if (logDayGame !== undefined) {
        return (
            <div className="flex flex-col gap-4 h-full">
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <DatePicker
                        value={dateValue}
                        placeholder="กรุณาเลือกวัน"
                        onChange={onCertainPeriodChange}
                        disableDate={disableCertainDate}
                    />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-11 gap-4">
                    <FastTrade className="2xl:col-span-3 xl:col-span-4" />
                </div>
                <Holding data={logDayGame[0]} dataview={statisticData} />
                <DayCommission />
                <MarketValue
                    className="2xl:col-span-8 xl:col-span-7"
                    data={logGame}
                />
            </div>
        )
    }
}

export default Daily_overview

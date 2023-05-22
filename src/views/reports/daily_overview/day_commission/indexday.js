import React, { useEffect, useState  } from 'react'
import { Loading } from 'components/shared'
import PortfolioStats from './components/PortfolioStats'
import MarketValue from './components/MarketValue'
import reducer from './store'
import { DatePicker } from 'components/ui'
import { injectReducer } from 'store/index'
import { getCryptoDashboardData } from './store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'

injectReducer('cryptoDashboard', reducer)

const DayCommission = () => {
    const dispatch = useDispatch()
    const [dateValue, setDateValue] = useState(new Date())

    const {datacommission, data
    } = useSelector((state) => state.dailyDashboard.data.dashboardData)
    
    const loading = useSelector((state) => state.dailyDashboard.data.loadingAll)

    /*useEffect(() => {
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
    }*/

    const disableCertainDate = (date) => {
        const banDate = [0]
        return banDate.includes(date.getDate())
    }
    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={loading}>
                <div className="flex flex-col gap-4 h-full">
                    <PortfolioStats
                        className="2xl:col-span-8 xl:col-span-7"
                        data={datacommission}
                    />
                     <MarketValue
                        className="2xl:col-span-8 xl:col-span-7"
                        data={data}
                    />
                </div>
            </Loading>
        </div>
    )
}

export default DayCommission

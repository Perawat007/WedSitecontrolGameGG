import React, { useEffect } from 'react'
import { Loading } from 'components/shared'
import Statistic from './Statistic'
import SalesReport from './SalesReport'
import SalesByCategories from './SalesByCategories'
import Holding from './Holding'
import { getSalesDashboardData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'

const SalesDashboardBody = () => {
    const dispatch = useDispatch()

    const statisticData = useSelector((state) => state.salesDashboard.data.dashboardData)
    const loading = useSelector((state) => state.salesDashboard.data.loading)
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getSalesDashboardData())
    }
    
    return (
        <Loading loading={loading}>
            <Statistic data={statisticData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SalesReport data={statisticData} className="col-span-2" />
                <SalesByCategories data={statisticData} />
            </div>
            {/*<Holding data={statisticData.dataGame}/>*/}
        </Loading>
    )
}

export default SalesDashboardBody

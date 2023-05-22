import React, { useEffect } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { getcommissionDashboardData } from './store/dataSlice'
import { Loading } from 'components/shared'
import Leads from './components/Leads'
import { useDispatch, useSelector } from 'react-redux'

injectReducer('commissionDashboard', reducer)

const ReceivedPercentage = () => {
    const dispatch = useDispatch()

    const {dataGame} =
        useSelector((state) => state.commissionDashboard.data.commissionData)
    const loading = useSelector((state) => state.commissionDashboard.data.commissionloading)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getcommissionDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={loading}>
                <Leads data={dataGame} />
            </Loading>
        </div>
    )
}

export default ReceivedPercentage

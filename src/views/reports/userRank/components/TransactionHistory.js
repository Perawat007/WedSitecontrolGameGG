import React, { useEffect } from 'react'
import {
    getTransctionHistoryData,
    setSelectedTab,
    setTableData,
    initialTableData,
    setTransactionHistoryData,
} from '../store/dataSlice'
import { Card, Tabs } from 'components/ui'
import OrderTable from './OrderTable'
import { useDispatch, useSelector } from 'react-redux'

const { TabNav, TabList, TabContent } = Tabs

const TransactionHistory = () => {
    const dispatch = useDispatch()

    const data = useSelector(
        (state) => state.crmDashboard.data.transactionHistoryData
    )

    const loading = useSelector(
        (state) => state.crmDashboard.data.transactionHistoryLoading
    )

    const selectedTab = useSelector(
        (state) => state.crmDashboard.data.selectedTab
    )
    const tableData = useSelector((state) => state.crmDashboard.data.tableData)

    useEffect(() => {
        dispatch(getTransctionHistoryData({ tab: selectedTab, ...tableData }))
    }, [dispatch, selectedTab, tableData])

    const handleTabChange = (val) => {
        dispatch(setTransactionHistoryData([]))
        dispatch(setSelectedTab(val))
        dispatch(setTableData(initialTableData))
    }

    return (
        <Card>
            <h4 className="mb-4">Game</h4>
            <Tabs value={selectedTab} variant="pill" onChange={handleTabChange}>
                <TabList>
                    <TabNav value="Go_Gold">Go Gold Planet</TabNav>
                    <TabNav value="Lucky">Lucky Bunny Gold</TabNav>
                    <TabNav value="CowBoys">CowBoys VS Aliens</TabNav>
                </TabList>
                <div className="mt-4">
                    <TabContent value="Go_Gold">
                        <OrderTable
                            data={data}
                            loading={loading}
                            pagingData={tableData}
                        />
                    </TabContent>
                    <TabContent value="Lucky">
                        <OrderTable
                            data={data}
                            loading={loading}
                            pagingData={tableData}
                        />
                    </TabContent>
                    <TabContent value="CowBoys">
                        <OrderTable
                            data={data}
                            loading={loading}
                            pagingData={tableData}
                        />
                    </TabContent>
                </div>
            </Tabs>
        </Card>
    )
}

export default TransactionHistory

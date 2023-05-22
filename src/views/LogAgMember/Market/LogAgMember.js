import React, { useEffect, useRef } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard } from 'components/shared'
import {
    getMarketData,
    setSelectedTab,
    setTableData,
    setMarketData,
    initialTableData,
} from './store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import cloneDeep from 'lodash/cloneDeep'
import AllTable from './components/AllTable'

injectReducer('cryptoMarket', reducer)

const { TabNav, TabList, TabContent } = Tabs

const LogAgMember = (id) => {

    const dispatch = useDispatch()

    const inputRef = useRef()

    const data = useSelector((state) => state.cryptoMarket.data.marketData)

    const loading = useSelector((state) => state.cryptoMarket.data.loading)

    const selectedTab = useSelector(
        (state) => state.cryptoMarket.data.selectedTab
    )

    const tableData = useSelector((state) => state.cryptoMarket.data.tableData)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, selectedTab, tableData])

    const fetchData = () => {
        dispatch(getMarketData({ tab: selectedTab, ...tableData, id : id}))
    }

    const handleTabChange = (val) => {
        dispatch(setMarketData([]))
        dispatch(setSelectedTab(val))
        dispatch(setTableData(initialTableData))
    }

    return (
        <>
            <AdaptableCard>
                <Tabs
                    value={selectedTab}
                    variant="pill"
                    onChange={handleTabChange}
                >
                    <div className="mt-4">
                    <TabContent value="all">
                            <AllTable {...{ data, loading, tableData }} />
                        </TabContent>
                    </div>
                </Tabs>
            </AdaptableCard>
        </>
    )
}

export default LogAgMember

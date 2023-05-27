import React, { useEffect, useRef, useState } from 'react'
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
import { useLocation, useNavigate } from 'react-router-dom'

injectReducer('cryptoMarket', reducer)

const { TabNav, TabList, TabContent } = Tabs

const LogData = (id) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputRef = useRef()

    const data = useSelector((state) => state.cryptoMarket.data.marketData)

    const loading = useSelector((state) => state.cryptoMarket.data.loading)

    const selectedTab = useSelector(
        (state) => state.cryptoMarket.data.selectedTab
    )

    const tableData = useSelector((state) => state.cryptoMarket.data.tableData)
    const [isClickedB, setIsClickedB] = useState(true);

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, selectedTab, tableData])

    const fetchData = () => {
        const pathA = window.location.pathname;
        const pathSegments = pathA.split('/');
        dispatch(getMarketData({ tab: selectedTab, ...tableData, id: pathSegments[4] }))
    }

    const handleTabChange = (val) => {
        dispatch(setMarketData([]))
        dispatch(setSelectedTab(val))
        dispatch(setTableData(initialTableData))
    }

    const BackPang = () => {
        const pathA = window.location.pathname;
        const pathSegments = pathA.split('/');
        setIsClickedB(false);
        navigate(`/memberSub/${pathSegments[2]}/${pathSegments[3]}`)
    }

    const h4Style = {
        color: isClickedB ? '#FF9933' : 'white',
        cursor: 'pointer',
        display: 'inline-block',
        marginRight: '10px',
    };

    const Style = {
        color: 'white',
        display: 'inline-block',
        marginRight: '10px',
    };

    return (
        <>
            <AdaptableCard>
                <Tabs
                    value={selectedTab}
                    variant="pill"
                    onChange={handleTabChange}
                >
                    <div>
                        <h6 style={Style}>กลับ</h6>
                        <a style={h4Style} onClick={BackPang}>All Member</a>
                    </div>
                    <br />
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

export default LogData

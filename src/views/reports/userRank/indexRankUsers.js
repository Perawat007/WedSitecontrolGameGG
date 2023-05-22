import React, { useEffect, useCallback } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { Loading } from 'components/shared'
import Leads from './components/Leads'
import LeadsgameGGold from './components/LeadsgameGGold'
import LeadsLuckyBunny from './components/LeadsLuckyBunny'
import { useDispatch, useSelector } from 'react-redux'
import TransactionHistory from './components/TransactionHistory'
injectReducer('crmDashboard', reducer)

const RankUsers = () => {
    const dispatch = useDispatch()

    const loading = useSelector((state) => state.crmDashboard.data.loading)
    
    return (
        <div className="flex flex-col gap-4 h-full">
             <div className="flex items-center justify-between mb-4">
                <h4>Users Rank</h4>
            </div>
             <Loading loading={loading}>
                <TransactionHistory />
            </Loading>
        </div>
    )
}

export default RankUsers

import React from 'react'
import { AdaptableCard } from 'components/shared'
import Customers from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('crmCustomers', reducer)
/** Example purpose only */
const CollapseMenuItemView2 = () => {
    return (
        <>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <Customers />
            </AdaptableCard>
        </>
    )
}

export default CollapseMenuItemView2

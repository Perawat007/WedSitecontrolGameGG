import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetAccountSettingData } from 'services/AccountServices'
import { useSelector } from 'react-redux'
import CustomerAddDialog from '../Customers/components/CustomerAddDialog'
const AddSubAgentFrom = lazy(() => import('./components/AddAgent'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
    profile: { label: 'AddSubAgentFrom', path: 'addAgent' },
}

const AddSubAgent = () => {
    const [currentTab, setCurrentTab] = useState('addAgent')
    const [dataAgent, setData] = useState('')

    const idAgent = useSelector(
        (state) => state.auth.user
    )
    const idUser = idAgent.id


    const navigate = useNavigate()

    const location = useLocation()

    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    const onTabChange = (val) => {
        setCurrentTab(val)
        navigate(`/app/account/settings/${val}`)
    }

    const fetchData = async () => {
        const response = await apiGetAccountSettingData(idUser)
        setData(response.data[0])
    }

    useEffect(() => {
        setCurrentTab(path)
        if (isEmpty(dataAgent)) {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <CustomerAddDialog/>
    )
}

export default AddSubAgent

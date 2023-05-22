import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetAccountSettingData } from 'services/AccountServices'
import { useSelector } from 'react-redux'
import CustomerEditDialog from './components/CustomerEditDialog'


//const AddSubAgentFrom = lazy(() => import('./components/AddAgent'))


const EditPassword = () => {
    
    return (
        <CustomerEditDialog/>
    )
}

export default EditPassword
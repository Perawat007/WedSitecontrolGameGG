import React, { useState } from 'react'
import { Card, Dialog } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTradeDialog } from '../store/stateSlice'
import { useNavigate } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

const FastTrade = ({ className }) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const tradeDialogOpen = useSelector(
        (state) => state.cryptoDashboard.state.tradeDialogOpen
    )

    const [status, setStatus] = useState('')
    const [confirmLoading, setConfirmLoading] = useState(false)

    const [showProceed, setShowProceed] = useState({})

    const handleTrade = (values, setSubmitting, trade) => {
        setTimeout(() => {
            setSubmitting(false)
            dispatch(toggleTradeDialog(true))
            setShowProceed({ ...values, type: trade })
            setConfirmLoading(false)
            setStatus('')
        }, 500)
    }

    const onDialogClose = () => {
        dispatch(toggleTradeDialog(false))
        setTimeout(() => {
            setShowProceed({})
            setConfirmLoading(false)
            setStatus('')
        }, 300)
    }

    const hadleConfirm = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            setStatus('SUCCESS')
        }, 1000)
    }

    const handleDone = (redirect) => {
        onDialogClose()
        if (redirect) {
            navigate('/app/crypto/wallets')
        }
    }

    return (
        <>
            <Dialog
                isOpen={tradeDialogOpen}
                onRequestClose={onDialogClose}
                onClose={onDialogClose}
                width={400}
            >
               
            </Dialog>
        </>
    )
}

export default FastTrade

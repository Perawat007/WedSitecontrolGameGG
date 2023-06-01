import React, { useEffect, useState } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification, Button, Dialog } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { getGame, updateProduct, deleteProduct } from './store/dataSlice'
import FormsEditPercent from '../FormsEditPercent'
import isEmpty from 'lodash/isEmpty'

injectReducer('editPreCentGame', reducer)

const EditPercent = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const data = useSelector(
        (state) => state.editPreCentGame.data.productData
    )

    /*const { logDayGame,
    } = useSelector((state) => state.cryptoDashboard.data.dashboardData)*/

    const loading = useSelector((state) => state.editPreCentGame.data.loading)

    const fetchData = (data) => {
        dispatch(getGame(data))
    }

    const handleFormSubmit = async (values) => {

    }

    const handleDiscard = () => {
        navigate('/editDataAgent')
    }

    const handleDelete = async (setDialogOpen) => {
        setDialogOpen(false)
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    if (loading !== false || data !== '') {                        

        return (
            <>
                <div>
                    <Loading loading={loading}>
                        {!isEmpty(data) && (
                            <>
                                <FormsEditPercent
                                    type="edit"
                                    data={data.data}
                                    valus={data.dataValus}
                                />
                            </>
                        )}
                    </Loading>
                    {!loading && isEmpty(data) && (
                        <div className="h-full flex flex-col items-center justify-center">
                            <h3 className="mt-8">No product found!</h3>
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default EditPercent

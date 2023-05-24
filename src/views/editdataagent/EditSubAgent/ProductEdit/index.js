import React, { useEffect, useState } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification,  Button, Dialog  } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSubAgent, updateProduct, deleteProduct } from './store/dataSlice'
import ProductForm from '../ProductForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('salesProductEdit', reducer)

const SubAgentEdit = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [okay, setOkay] = useState(false)
    const [dataEdit, setDataEdit] = useState('')


    const productData = useSelector(
        (state) => state.salesProductEdit.data.productData
    )
    const loading = useSelector((state) => state.salesProductEdit.data.loading)

    const fetchData = (data) => {
        dispatch(getSubAgent(data))
    }

    const handleFormSubmit = async (values) => {
        setIsOpen(true)
        setDataEdit(values);
    }

    const editDataSUb = async () => {
        console.log(dataEdit);
        const success = await updateProduct(dataEdit)
        navigate('/editDataAgent')
    }

    const onDialogClose = (e) => {
        setOkay(false)
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        setIsOpen(false)
        editDataSUb();
    }


    const handleDiscard = () => {
        navigate('/editDataAgent')
    }

    const handleDelete = async (setDialogOpen) => {
        setDialogOpen(false)
        /*const success = await deleteProduct({ id: productData.id })
        if (success) {
            popNotification('deleted')
        }*/
    }

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Product successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/editDataAgent')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <div>
                <Dialog
                    isOpen={dialogIsOpen}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <h5 className="mb-4">การแจ้งเตือน</h5>
                    <p>
                        คุณต้องการแก้ไขข้อมูลตามนี้หรือไม่
                    </p>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            ยกเลิก
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            แก้ไข
                        </Button>
                    </div>
                </Dialog>

                <Loading loading={loading}>
                    {!isEmpty(productData[0]) && (
                        <>
                            <ProductForm
                                type="edit"
                                initialData={productData[0]}
                                onFormSubmit={handleFormSubmit}
                                onDiscard={handleDiscard}
                                onDelete={handleDelete}
                            />
                        </>
                    )}
                </Loading>
                {!loading && isEmpty(productData) && (
                    <div className="h-full flex flex-col items-center justify-center">
                        <h3 className="mt-8">No product found!</h3>
                    </div>
                )}
            </div>

        </>
    )
}

export default SubAgentEdit

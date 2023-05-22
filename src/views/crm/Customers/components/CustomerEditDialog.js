import React, { useRef, useState } from 'react'
import { Button, Drawer, Dialog } from 'components/ui'
import CustomerEditContent from './CustomerEditContent'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerClose, setSelectedCustomer } from '../store/stateSlice'
import { DeleteAdmin } from '../store/dataSliceAdmin'


const DrawerFooter = ({ onSaveClick, onCancel, onDelete}) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" variant="solid" color="red-600" onClick={onDelete}>
                Delete
            </Button>
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Save
            </Button>
        </div>
    )
}

const CustomerEditDialog = () => {
    const dispatch = useDispatch()

    const drawerOpen = useSelector(
        (state) => state.crmCustomers.state.drawerOpen
    )

    const customer = useSelector(
        (state) => state.crmCustomers.state.selectedCustomer
    )

    const onDrawerClose = () => {
        dispatch(setDrawerClose())
        dispatch(setSelectedCustomer({}))
    }

    const deleteAdmin =() =>{
        dispatch(DeleteAdmin(customer.id))
        dispatch(setDrawerClose())
        dispatch(setSelectedCustomer({}))
    }

    const formikRef = useRef()

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <Dialog
            isOpen={drawerOpen}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
            closable={false}
            width={500}
            height={700}
            bodyClass="p-0"
        >
        <div className="flex flex-col h-full justify-between">
            <div className="overflow-y-auto">
                <CustomerEditContent ref={formikRef} />  
            </div>
            <DrawerFooter
            onDelete={deleteAdmin}
            onCancel={onDrawerClose}
            onSaveClick={formSubmit}
        />
        </div>
        </Dialog>
    )
}

export default CustomerEditDialog

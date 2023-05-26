import React, { useRef } from 'react'
import { Button, Drawer, Dialog } from 'components/ui'
import CustomerEditContent from './CustomerEditContent'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerClose, setSelectedCustomer } from '../store/stateSlice'
import { DeleteMemBer } from '../store/dataSliceSubAgent'
import { useNavigate } from 'react-router-dom'
import {
    HiPhone,
} from 'react-icons/hi'
const DrawerFooter = ({ onSaveClick, onCancel, onDelete }) => {
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
    const navigate = useNavigate();

    const drawerOpen = useSelector(
        (state) => state.crmMemSubAgent.state.drawerOpen
    )

    const customer = useSelector(
        (state) => state.crmMemSubAgent.state.selectedCustomer
    )
    
    const onDrawerClose = () => {
        const pathA = window.location.pathname;
        const pathSegments = pathA.split('/');
        navigate(`/memberSub/${pathSegments[2]}/${pathSegments[3]}`)
        dispatch(setSelectedCustomer({}))
    }

    const deleteMember =() =>{
        dispatch(DeleteMemBer(customer.id, 'member'))
        dispatch(setDrawerClose())
        dispatch(setSelectedCustomer({}))
    }

    const formikRef = useRef()

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
    <div className="flex flex-col h-full justify-between">
        <div className="overflow-y-auto">
            <CustomerEditContent ref={formikRef} />  
        </div>
        <DrawerFooter
        onDelete={deleteMember}
        onCancel={onDrawerClose}
        onSaveClick={formSubmit}
    />
    </div>
    )
}

export default CustomerEditDialog

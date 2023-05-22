import React, { useRef } from 'react'
import { Button, Drawer, Dialog } from 'components/ui'
import CustomerEditContent from './CustomerEditContent'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerClose, setSelectedCustomer } from '../store/stateSlice'
import { DeleteAgent } from '../store/dataSliceAdmin'

const DrawerFooter = ({ onSaveClick, onCancel, onDelete }) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Save
            </Button>
        </div>
    )
}

const CustomerEditDialog = () => {

    const idAgent = useSelector(
        (state) => state.auth.user
    )

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
        onSaveClick={formSubmit}
    />
    </div>
    )
}

export default CustomerEditDialog

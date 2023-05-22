import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, editPasswordSub } from '../store/dataSliceAdmin'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/editdataagent/CustomerForm'

const CustomerEditContent = forwardRef((_, ref) => {
    
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.auth.user
    )

    //const { id } = customer
    const onFormSubmit = (values) => {
        const {
            id,
            username,
            password,
            newPassword,
            confirmPassword,
        } = values
        const basicInfo = { username,password, newPassword, confirmPassword}

        if (!isEmpty(values)) {
            if (values.password !== '' && values.newPassword !== '' && values.confirmPassword !== ''){
                dispatch(editPasswordSub(values)) //เรียกใช้งาน API 
           }
           else{
               alert("กรุณากรอกข้อมูลให้ครบ");
           } 
        }
    }

    return (
        <CustomerForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={customer}
        />
    )
})

export default CustomerEditContent

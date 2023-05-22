import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer } from '../store/dataSliceAdmin'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/crm/CustomerForm'

const CustomerEditContent = forwardRef((_, ref) => {
    
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmCustomers.state.selectedCustomer
    )

    const data = useSelector((state) => state.crmCustomers.data.customerList)
    const { id } = customer
    const onFormSubmit = (values) => {
        const {
            id,
            username,
            name,
            phoneNumber,
            status,
            idUser,
        } = values

        const basicInfo = { username,name, phoneNumber, status,idUser }
        const personalInfo = {
            id,
            username,
            name,
            status,
            phoneNumber,
            idUser
        }
        let newData = cloneDeep(data)
        let editedCustomer = {}
        newData = newData.map((elm) => {
            if (elm.id === id) {
                elm = { ...elm, ...basicInfo }
                elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                editedCustomer = elm.personalInfo
            }
            return elm.personalInfo
        })
        if (!isEmpty(editedCustomer)) {
            if (values.name !== '' && values.password !== '' && values.phoneNumber !== ''){
                dispatch(putCustomer(values)) //เรียกใช้งาน API 
                dispatch(setDrawerClose())
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

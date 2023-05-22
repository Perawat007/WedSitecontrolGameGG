import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer } from '../store/dataSliceAdmin'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/membergame/CustomerForm/index'

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
            member_code,
            name,
            username,
            status,
            credit,
            idUser,
        } = values

        const basicInfo = {member_code, name, username, status, credit,idUser }
        const personalInfo = {
            id,
            member_code,
            username,
            name,
            status,
            credit,
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
            if (values.name !== '' && values.username !== '' && values.password !== ''& values.contact_number !== '' & values.credit !== '' ){
                //dispatch(putCustomer(values))
            }else{
                alert("กรุณากรอกข้อมูลให้ครบ");
            } 
        }
        dispatch(setDrawerClose())
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

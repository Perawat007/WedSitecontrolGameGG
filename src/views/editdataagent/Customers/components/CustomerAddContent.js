import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddCustomer } from '../store/dataSliceAdmin'
import { setDrawerClose } from '../store/addSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerFormAddAg from 'views/editdataagent/CustomerFormAddAg'

const CustomerAddContent = forwardRef((_, ref) => {
    
    const dispatch = useDispatch()

    /*const customer = useSelector(
        (addAgent) => addAgent.crmCustomers.state.selectedCustomer
    )*/
    //const data = useSelector((addAgent) => addAgent.crmCustomers.data.customerList)
    //const { id } = customer

    const onFormSubmit = (values) => {
        const {
            id_Agent,
            name,
            username,
            password,
            contact_number,
            credit,
            positiontype,
            level,
        } = values

        const basicInfo = {id_Agent, name, username, password, contact_number, credit, positiontype, level}
        const personalInfo = {
            id_Agent,
            name,
            username,
            password,
            contact_number,
            credit,
            positiontype,
            level,
        }
       // let newData = cloneDeep(data)
        let editedCustomer = {}
       /*newData = newData.map((elm) => {
            if (elm.id === id) {
                elm = { ...elm, ...basicInfo }
                elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                editedCustomer = elm.personalInfo
            }
            return elm.personalInfo
        })*/
        if (isEmpty(editedCustomer)) {
            if (values.name !== '' && values.username !== '' && values.password !== ''&& values.contact_number !== '' && values.credit !== '' && values.positiontype !=='', values.level !== '' ){
                dispatch(AddCustomer(values)) //เรียกใช้งาน API 
           }
           else{
               alert("กรุณากรอกข้อมูลให้ครบ");
           } 
        }
    }

    return (
        <CustomerFormAddAg
            ref={ref}
            onFormSubmit={onFormSubmit}
        />
    )
})

export default CustomerAddContent

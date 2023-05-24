import React, { forwardRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddCustomer } from '../store/dataSliceAdmin'
import { setDrawerClose } from '../store/addSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerFormAddAg from 'views/editdataagent/CustomerFormAddAg'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog } from 'components/ui'

const CustomerAddContent = forwardRef((_, ref) => {
    
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [okay, setOkay] = useState(false)
    const [dataEdit, setDataEdit] = useState('')
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
            if (values.name !== '' && values.username !== '' && values.password !== ''&& values.contact_number !== '' && values.credit !== '' && values.positiontype !=='' && values.level !== '' ){
                setIsOpen(true)
                setDataEdit(values);
           }
           else{
               alert("กรุณากรอกข้อมูลให้ครบ");
           } 
        }
    }
    const editDataSUb = () => {
        dispatch(AddCustomer(dataEdit)) 
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


    return (
        <div>
        <Dialog
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h5 className="mb-4">การแจ้งเตือน</h5>
            <p>
                คุณต้องการเพิ่ม SubAgent ตามนี้ใช่หรือไม่
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
                    เพิ่ม
                </Button>
            </div>
        </Dialog>

        <CustomerFormAddAg
            ref={ref}
            onFormSubmit={onFormSubmit}
        />
    </div>
    )
})

export default CustomerAddContent

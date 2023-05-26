import React, { forwardRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddCustomer } from '../store/dataSliceSubAgent'
import { setDrawerClose } from '../store/addSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerFormAddAg from '../../CustomerFormAddAg'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog } from 'components/ui'

const CustomerAddContent = forwardRef((_, ref) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [okay, setOkay] = useState(false)
    const [dataEdit, setDataEdit] = useState('')

    const customer = [];

    const onFormSubmit = (values, IdAgent) => {
        const {
            agent_id,
            member_code,
            name,
            username,
            password,
            credit,
        } = values
        const basicInfo = {agent_id:IdAgent, member_code, name, username, password, credit}
        
        console.log(values);
        //dispatch(AddCustomer(values, IdAgent)) //เรียกใช้งาน API 
        if (values) {
            if (values.name !== '' && values.username !== '' && values.password !== '' && values.agent_id !== ''){
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
        const pathA = window.location.pathname;
        const pathSegments = pathA.split('/');
        navigate(`/memberSub/${pathSegments[2]}/${pathSegments[3]}`)
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
                คุณต้องการเพิ่ม Member ตามนี้ใช่หรือไม่
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
            customer={customer}
        />
    </div>
    )
})

export default CustomerAddContent

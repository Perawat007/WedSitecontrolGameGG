//clear All เปลี่ยนเป็น Add 

import React, { useRef } from 'react'
import { Button } from 'components/ui'
import { getCustomers, setTableData } from '../store/dataSliceSubAgent'
import CustomerTableSearch from './CustomerTableSearch'
import CustomerTableFilter from './CustomerTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import { useLocation, useNavigate } from 'react-router-dom'
import { setDrawerOpen } from '../store/addSlice'

const CustomersTableTools = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.crmMemSubAgent.data.tableData)

    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    const pathA = window.location.pathname;
    const pathSegments = pathA.split('/');
    
    const ActionColumn = () => { //สั่งทำงาน Add
        navigate(`/AddmemberSub/${pathSegments[2]}/${pathSegments[3]}`)
        //dispatch(setDrawerOpen())
    }

    const rquestParam = { id: path }

    const handleInputChange = (val) => {
        console.log(rquestParam.id)
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        newTableData.idUser = rquestParam.id
        if (typeof val === 'string' && val.length !== 0) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getCustomers(data))
    }

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <Button size="sm" onClick={ActionColumn}>
                    Add Member
                </Button>
            </div>
        </div>
    )
}

export default CustomersTableTools

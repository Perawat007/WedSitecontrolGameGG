//clear All เปลี่ยนเป็น Add 

import React, { useRef } from 'react'
import { Button } from 'components/ui'
import { getCustomers, setTableData } from '../store/dataSliceAdmin'
import CustomerTableSearch from './CustomerTableSearch'
import CustomerTableFilter from './CustomerTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'

import {setDrawerOpen} from '../store/addSlice'


const CustomersTableTools = () => {

    const dispatch = useDispatch()

    const ActionColumn = () => { //สั่งทำงาน Edit
        dispatch(setDrawerOpen())
    }

    const idAgent = useSelector(
        (state) => state.auth.user
    )
    const idUser = idAgent.id

    const inputRef = useRef()

    const tableData = useSelector((state) => state.crmCustomers.data.tableData)

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        newTableData.idUser = idUser
        if (typeof val === 'string' && val.length !== 0) {
            console.log(newTableData);
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
        </div>
    )
}

export default CustomersTableTools

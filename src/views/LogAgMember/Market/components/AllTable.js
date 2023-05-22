import React, { useMemo } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { setTableData } from '../store/dataSlice'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import useThemeClass from 'utils/hooks/useThemeClass'
import {
    HiCalendar,
    HiChevronDoubleUp,
    HiChevronDoubleDown,
    HiCurrencyDollar,
    HiCheck,
    HiMinusCircle,
} from 'react-icons/hi'
const AllTable = ({ data, loading, tableData }) => {
    const dispatch = useDispatch()

    const statusColor = {
        active: 'bg-emerald-500',
        blocked: 'bg-red-500',
    }
    
    const NameColumn = ({ row }) => {
        const { textTheme } = useThemeClass()
    
        return (
            <div className="flex items-center">
               { row.id}
            </div>
        )
    }

    const columns = useMemo(
        () => [
            {
                header: 'ID',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
             
            {
                header: 'UserName',
                accessorKey: 'username',
            },
        
            {
                header: 'Name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                             <Avatar size={28} shape="circle" src={"/img/avatars/thumb-1.jpg"} />
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.name}
                            </span>
                        </div>
                    )
                },
            },
        
            {
                header: 'Credit',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <HiCurrencyDollar className="text-emerald-500 text-xl"/>
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.credit}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Status',
                cell: (props) => {
                    const row = props.row.original
                    if (row.status === 'Y'){
                        return (
                            <div className="flex items-center">
                                <HiCheck className="text-emerald-500 text-xl" />
                                <span className="ml-2 rtl:mr-2 capitalize">
                                    {'Active'}
                                </span>
                            </div>
                        )
                    }
                    else{
                        return (
                            <div className="flex items-center">
                                <HiMinusCircle className={statusColor['blocked']} />
                                <span className="ml-2 rtl:mr-2 capitalize">
                                    {'Blocked'}
                                </span>
                            </div>
                        )
                    
                    }
                },
            },
            {
                header: 'Created_at',
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original
                    const inputDate = row.created_at;
                    const date = new Date(inputDate);
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.toLocaleTimeString()}`;
                    return (
                        <div className="flex items-center">
                            <HiCalendar className="text-emerald-500 text-xl"/>
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {formattedDate}
                            </span>
                        </div>
                    )
                },
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ size: 'sm', className: 'rounded-md' }}
            loading={loading}
            pagingData={tableData}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
        />
    )
}

export default AllTable

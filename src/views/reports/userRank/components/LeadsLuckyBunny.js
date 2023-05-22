import React, { useEffect, useCallback, useMemo } from 'react'
import { Card, Button, Table, Tag, Avatar } from 'components/ui'
import { DataTable } from 'components/shared'
import { getCrmDashboardData, setTableData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    HiCurrencyDollar,
    HiCalendar,
    HiCheck,
    HiMinusCircle,
} from 'react-icons/hi'
import cloneDeep from 'lodash/cloneDeep'

const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const { Tr, Td, TBody, THead, Th } = Table

const NameColumn = ({ row }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar shape="circle" size={25} src={row.avatar} />
            <span className="font-semibold">{row.name}</span>
        </div>
    )
}

const NameColumnId = ({ row }) => {
    return (
        <div className="flex items-center">
           { row.id}
        </div>
    )
}
const columns = [

        {
            header: 'ID',
            cell: (props) => {
                const row = props.row.original
                return <NameColumnId row={row} />
            },
        },

        {
            header: 'Name',
            accessorKey: 'name',
            cell: (props) => {
                const row = props.row.original
                return <NameColumn row={row} />
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
    ]

const LeadsLuckyBunny = ({className }) => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmDashboard.data.customerList)
    const loading = useSelector((state) => state.crmDashboard.data.loading)
    const filterData = useSelector(
        (state) => state.crmDashboard.data.filterData
    )
    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.crmDashboard.data.tableData
    )

    const fetchData = useCallback(() => {
        dispatch(getCrmDashboardData({ pageIndex, pageSize, sort, query, filterData }))
    }, [pageIndex, pageSize, sort, query, filterData, dispatch])


    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort, filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
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
        <Card className={className}>
            <div className="flex items-center justify-between mb-4">
                <h4>Lucky Bunny Gold</h4>
            </div>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{ pageIndex, pageSize, sort, query, total }} //page ถัดไป
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
        </Card>
    )
}

export default LeadsLuckyBunny

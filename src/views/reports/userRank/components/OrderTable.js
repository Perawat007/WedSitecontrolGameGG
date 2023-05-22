import React, { useMemo } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { setTableData } from '../store/dataSlice'
import {
    HiOutlineSwitchHorizontal,
    HiOutlineArrowUp,
    HiOutlineArrowDown,
} from 'react-icons/hi'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

export const statusColor = {
    0: {
        label: 'Complete',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: { label: 'Canceled', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

const ActionIcon = ({ type }) => {
    switch (type) {
        case 0:
            return (
                <Avatar
                    size="sm"
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    icon={
                        <HiOutlineArrowDown
                            style={{ transform: 'rotate(45deg)' }}
                        />
                    }
                />
            )
        case 1:
            return (
                <Avatar
                    size="sm"
                    className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
                    icon={
                        <HiOutlineArrowUp
                            style={{ transform: 'rotate(45deg)' }}
                        />
                    }
                />
            )
        case 2:
            return (
                <Avatar
                    size="sm"
                    className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
                    icon={<HiOutlineSwitchHorizontal />}
                />
            )
        default:
            return <Avatar />
    }
}

const OrderTable = ({ data, loading, tableData }) => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                header: 'ID',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <span className="font-semibold heading-text whitespace-nowrap">
                                {row.id}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                        <div>
                            <ActionIcon type={2} />
                        </div>
                            <span>{row.name} </span>
                        </div>
                    )
                },
            },
            {
                header: 'Agent',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {row.username_agent}
                        </span>
                    )
                },
            },
            {
                header: 'TotalBet',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.credit} บาท</span>
                },
            },
            {
                header: 'Status',
                cell: (props) => {
                    const status = props.row.original.status
                    return (
                        <div className="flex items-center gap-2">
                            <Badge className={statusColor[0].dotClass} />
                            <span>{status}</span>
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

export default OrderTable

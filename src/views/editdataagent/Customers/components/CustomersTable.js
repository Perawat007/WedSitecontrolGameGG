import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { Avatar, Button, Dialog, Input } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCustomers, setTableData } from '../store/dataSliceAdmin'
import useThemeClass from 'utils/hooks/useThemeClass'
import LogAgMember from 'views/LogAgMember/Market/LogAgMember'
import LogEditData from 'views/LogEditUser/Market/LogEditData'
import cloneDeep from 'lodash/cloneDeep'
import { FiPercent } from "react-icons/fi";
import {
    HiPhone,
    HiCheck,
    HiMinusCircle,
    HiCurrencyDollar,
    HiOutlineDocumentText,
    HiOutlineUserGroup,
    HiPencil,
} from 'react-icons/hi'

const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/editSutAgent/${row.id}`)
    }

    const onEditPercent = () => {
        navigate(`/editPercentSutAgent/${row.id}`)
    }

    const onmemberSubAgent = () => {
        const pathA = window.location.pathname;
        const pathSegments = pathA.split('/');

        navigate(`/memberSub/${row.name}/${row.id}`)
    }

    const [viewOpen, setViewOpen] = useState(false)
    const [rowIdLog, setLogId] = useState();

    const onViewOpen = (rowId) => {
        setLogId(rowId.id)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
    }

    const [viewLogOpen, setViewLogOpen] = useState(false)

    const onDialogLogClose = () => {
        setViewLogOpen(false)
    }

    return (
        <div className="ltr:text-right rtl:text-left">
            <div>
                <Button variant="solid" color="green-600" icon={<HiOutlineUserGroup />} onClick={() => onmemberSubAgent()} />
                <Button variant="solid" color="blue-600" icon={<HiPencil />} onClick={() => onEdit()} />
                <Button variant="solid" color="red-600" icon={<FiPercent />} onClick={() => onEditPercent()} />
                <Button variant="solid" color="yellow-600" icon={<HiOutlineDocumentText />} onClick={() => onViewOpen(row)} />
            </div>

            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="w-full">
                    <h1>Log Edit</h1>
                    <LogEditData idLog={rowIdLog} typeLog={'agent'} />
                </div>
            </Dialog>
        </div>
    )
}

const NameColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            {row.id}
        </div>
    )
}

const columns = [

    {
        header: 'ลำดับ',
        cell: (props) => {
            const row = props.row.original
            return <NameColumn row={row} />
        },
    },

    {
        header: 'rank',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <Avatar size={28} shape="circle" src={"/img/avatars/thumb-1.jpg"} />
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.ranksubAgent}
                    </span>
                </div>
            )
        },
    },

    {
        header: 'UserName',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.username}
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
                <div className="flex items-center">
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.name}
                    </span>
                </div>
            )
        },
    },
    {
        header: 'สกุลบาท',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.currencysubagent}
                    </span>
                </div>
            )
        },
    },

    {
        header: 'เบอร์โทรติดต่อ',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <HiPhone className="text-emerald-500 text-xl" />
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.contact_number}
                    </span>
                </div>
            )
        },
    },

    {
        header: 'Status',
        cell: (props) => {
            const row = props.row.original
            if (row.status === 'Y') {
                return (
                    <div className="flex items-center">
                        <HiCheck className="text-emerald-500 text-xl" />
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {'Active'}
                        </span>
                    </div>
                )
            }
            else {
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
        header: 'Credit',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <HiCurrencyDollar className="text-emerald-500 text-xl" />
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.creditsub}
                    </span>
                </div>
            )
        },
    },
    {
        header: '',
        id: 'action',
        cell: (props) => <ActionColumn row={props.row.original} />,
    },
]
const Customers = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmCustomers.data.customerList)
    const loading = useSelector((state) => state.crmCustomers.data.loading)
    const filterData = useSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const idAgent = useSelector(
        (state) => state.auth.user
    )
    const idUser = idAgent.id

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageIndex, pageSize, sort, query, filterData, idUser }))
    }, [pageIndex, pageSize, sort, query, filterData, idUser, dispatch])


    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort, filterData, idUser])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total, idUser }),
        [pageIndex, pageSize, sort, query, total, idUser]
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
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{ pageIndex, pageSize, sort, query, total }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
        </>
    )
}

export default Customers

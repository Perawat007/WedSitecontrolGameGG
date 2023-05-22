import React, { useMemo } from 'react'
import classNames from 'classnames'
import { Card, Button, Table, Avatar } from 'components/ui'
import growShrinkColor from 'utils/growShrinkColor'
import NumberFormat from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import {
    HiCalendar
} from 'react-icons/hi'
const { Tr, Td, TBody, THead, Th } = Table

const MarketValue = ({ data = [], className }) => {
    const columns = useMemo(
        () => [
            {
                header: 'เดือนที่',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    const date = new Date(row.monthly);
                    const month = date.getUTCMonth() + 1; // UTC month starts from 0
                    const year = date.getUTCFullYear();
                    const formattedDate = `${month}/${year}`;
                    return (
                        <div className="flex items-center gap-3">
                            <span>{formattedDate}</span>
                        </div>
                    )
                },
            },

            {
                header: 'Day',
                cell: (props) => {
                    const row = props.row.original
                    const inputDate = row.day;
                    const date = new Date(inputDate);
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
            {
                header: 'Go Gold Planet',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>
                            <span style={{justifyContent: 'center', alignItems: 'center' }}>ยอดเล่น {row.bet_gogold} &nbsp; ยอดชนะ  {row.win_gogold}</span>
                        </div>
                    )
                },
            },
          
            {
                header: 'Lucky Bunny Gold',
                accessorKey: 'luckyCommission',
                cell: (props) => {
                    const volumn = props.row.original
                    return (
                    <div>
                        <span style={{justifyContent: 'center', alignItems: 'center' }}>ยอดเล่น {volumn.bet_luckybunny} &nbsp; ยอดชนะ {volumn.win_luckybunny} </span>
                    </div>
                    )
                },
            },
            
            {
                header: 'CowBoys Vs Aliens',
                accessorKey: 'gameAliens',
                cell: (props) => {
                    const volumn = props.row.original
                    return (
                        <div>
                            <span style={{justifyContent: 'center', alignItems: 'center'}}>ยอดเล่น {volumn.bet_aliens} &nbsp; ยอดชนะ {volumn.win_aliens}</span>
                        </div>
                    )
                },
            },

            {
                header: 'Com. เกมส์',
                accessorKey: 'commission',
                cell: (props) => {
                    const volumn = props.row.original
                    return (
                    <div>
                        <span style={{justifyContent: 'center', alignItems: 'center'}}> &nbsp;&nbsp;&nbsp;&nbsp;  {volumn.commission} </span>
                    </div>
                    )
                },
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-6">
                <h4>รายงานยอดค่าคอมเกม</h4>
            </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    )
}

export default MarketValue

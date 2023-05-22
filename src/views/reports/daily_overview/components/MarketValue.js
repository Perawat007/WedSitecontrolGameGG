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

const { Tr, Td, TBody, THead, Th } = Table

const MarketValue = ({ data = [], className }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/app/crypto/market')
    }

    const columns = useMemo(
        () => [
            {
                header: 'NameGame',
                accessorKey: 'name',
                cell: (props) => {
                    const { icon, symbol, namegame } = props.row.original
                    return (
                        <div className="flex items-center gap-3">
                            <Avatar
                                src={icon}
                                size="sm"
                                className="!bg-transparent"
                            />
                            <span className="font-bold heading-text">
                                {symbol}
                            </span>
                            <span>{namegame}</span>
                        </div>
                    )
                },
            },
            {
                header: 'เล่นแล้ว/ครั้ง',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>
                            <span style={{justifyContent: 'center', alignItems: 'center' }}>{row.play}</span>
                        </div>
                    )
                },
            },
            {
                header: 'รวม Bet',
                accessorKey: 'change',
                cell: (props) => {
                    const change  = props.row.original
                    return (
                        <div>
                            <span style={{justifyContent: 'center', alignItems: 'center' }}>{change.bet}</span>
                        </div>
                    )
                },
            },
            {
                header: 'รวม Win',
                accessorKey: 'volumn',
                cell: (props) => {
                    const volumn = props.row.original
                    return (
                    <div>
                        <span style={{justifyContent: 'center', alignItems: 'center' }}>{volumn.win}</span>
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
                <h4>รายงานเกม</h4>
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

import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Dialog, Button, hooks, Input, Switcher, Select, Table, Avatar, Card } from 'components/ui'
import { Form, Formik, Field } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSave } from 'react-icons/ai'
import { StickyFooter } from 'components/shared'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

const { Tr, Td, TBody, THead, Th, Sorter } = Table

const level = [
    {
        options: [
            { label: '0%' }, { label: '1%' }, { label: '2%' }, { label: '3%' }, { label: '4%' }, { label: '5%' }, { label: '6%' }, { label: '7%' }, { label: '8%' }, { label: '9%' }, { label: '10%' },
            { label: '11%' }, { label: '12%' }, { label: '13%' }, { label: '14%' }, { label: '15%' }, { label: '16%' }, { label: '17%' }, { label: '18%' }, { label: '19%' }, { label: '20%' },
            { label: '21%' }, { label: '22%' }, { label: '23%' }, { label: '24%' }, { label: '25%' }, { label: '26%' }, { label: '27%' }, { label: '28%' }, { label: '29%' }, { label: '30%' },
            { label: '31%' }, { label: '32%' }, { label: '33%' }, { label: '34%' }, { label: '35%' }, { label: '36%' }, { label: '37%' }, { label: '38%' }, { label: '39%' }, { label: '40%' },
            { label: '41%' }, { label: '42%' }, { label: '43%' }, { label: '44%' }, { label: '45%' }, { label: '46%' }, { label: '47%' }, { label: '48%' }, { label: '49%' }, { label: '50%' },
            { label: '51%' }, { label: '52%' }, { label: '53%' }, { label: '54%' }, { label: '55%' }, { label: '56%' }, { label: '57%' }, { label: '58%' }, { label: '59%' }, { label: '60%' },
            { label: '61%' }, { label: '62%' }, { label: '63%' }, { label: '64%' }, { label: '65%' }, { label: '66%' }, { label: '67%' }, { label: '68%' }, { label: '69%' }, { label: '70%' },
            { label: '71%' }, { label: '72%' }, { label: '73%' }, { label: '74%' }, { label: '75%' }, { label: '76%' }, { label: '77%' }, { label: '78%' }, { label: '79%' }, { label: '80%' },
            { label: '81%' }, { label: '82%' }, { label: '83%' }, { label: '84%' }, { label: '85%' }, { label: '86%' }, { label: '87%' }, { label: '88%' }, { label: '89%' }, { label: '90%' },
        ]
    }
]

const FormsAddPercent = ({data = [], createPercent }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dataPercentarray = [];
    const dataActivearray = [];
    const [sorting, setSorting] = React.useState([])
    const popupRef = useRef(null);
    if (popupRef.current) {
        popupRef.current.style.display = 'none';
    }
    if (dataPercentarray.length === 0) {
        for (let i = 0; i < data.length; i++) {
            const dataPercentStart = {
                namegame: data[i].namegame,
                PercentValus: '0%',
            };

            const dataActiveStart = {
                namegame: data[i].namegame,
                activeValue: 'Y',
            };
            dataPercentarray.push(dataPercentStart);
            dataActivearray.push(dataActiveStart)
        }
    }
    const InputColumnAgent = ({ row }) => {
        createPercent(dataPercentarray, dataActivearray);
        const percentBefo = 0;
        const [values, setNewValues] = useState(90 - percentBefo + '%')
        const handleSelectChange = (event) => {
        };
        const valueStart = [{ options: [{ label: 0 + '%' }], }]

        const handleChanges = (newValue) => {
            const percentageString = newValue.label;
            const percentageNumber = parseFloat(percentageString);
            const valusPercent = percentageNumber
            const dataPercent = {
                namegame: row.namegame,
                PercentValus: valusPercent,
            };
            if (dataPercentarray.length !== 0) {
                for (let i = 0; i < dataPercentarray.length; i++) {
                    if (dataPercent.namegame === dataPercentarray[i].namegame) {
                        dataPercentarray.splice(i, 1);
                        break;
                    }
                }
            }
            dataPercentarray.push(dataPercent);
            setNewValues(90 - valusPercent + '%')
            createPercent(dataPercentarray, dataActivearray);
        }
        return (
            <div>
                <div>
                    <Select
                        defaultValue={valueStart[0].options[0]}
                        onChange={handleChanges}
                        placeholder="Type something..."
                        options={level}
                    />
                </div>
                <div className="flex items-center">
                    <Input
                        value={values}
                        onChange={handleSelectChange}
                        placeholder={'0%'}
                        disabled
                        readOnly
                    />
                </div>
            </div>
        )
    }

    const SwitcherActive = ({ row, name }) => {
        const [checked, setChecked] = useState(row)
        const onSwitcherToggle = (val, e) => {
            setChecked(!val)
            let statue_game = 'Y';
            if (checked === true) {
                statue_game = 'N'
            } else {
                statue_game = 'Y'
            }
            const dataActive = {
                namegame: name,
                activeValue: statue_game,
            };

            if (dataActivearray.length !== 0) {
                for (let i = 0; i < dataActivearray.length; i++) {
                    if (dataActive.namegame === dataActivearray[i].namegame) {
                        dataActivearray.splice(i, 1);
                        break;
                    }
                }
            }
            dataActivearray.push(dataActive);
            createPercent(dataPercentarray, dataActivearray);
        }
        return (
            <div>
                <Switcher checked={checked} onChange={onSwitcherToggle} />
            </div>
        )
    }
    const InputColumnSubAgent = (number) => {
        let value = number.value
        const handleSelectChange = (event) => {
        };

        if (value) {
            return (
                <div>
                    <Input
                        value={value}
                        onChange={handleSelectChange}
                        placeholder={'0%'}
                        disabled
                        readOnly
                    />
                </div>
            )
        }
    }

    const columns = useMemo(
        () => [
            {
                header: 'ลำดับ',
                cell: (props) => {

                    return (
                        <div className="flex items-center gap-3">
                            <span>{1}</span>
                        </div>
                    )
                },
            },
            {
                header: 'เปิด - ปิด',
                cell: (props) => {
                    const row = props.row.original
                    let status = true;
                    if (row.status_game === 'Y') {
                        status = true
                    } else {
                        status = false
                    }
                    return (
                        <div>
                            <SwitcherActive row={true} name={row.namegame} />
                        </div>
                    )
                },
            },

            {
                header: 'NameGame',
                cell: (props) => {
                    const { img, symbol, namegame } = props.row.original
                    return (
                        <div className="flex items-center gap-3">
                            <Avatar
                                src={img}
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
                header: 'ให้ถือเปอร์เซนต์   เปอร์เซนต์ของเรา',
                cell: (props) => {
                    return (
                        <div>
                            <InputColumnAgent row={props.row.original} />
                        </div>
                    )
                }
            },
        ],
    )

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <>
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <h4>กำหนด %</h4>
                </div>
                <Table>
                    <THead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <Th

                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={{ position: 'relative', width: header.getSize() }}
                                        >
                                            {
                                                header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                            }
                                            {header.column.getCanResize() && (
                                                <div
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    className={`table-resizer cursor-all-scroll ${header.column.getIsResizing() ? 'isResizing' : ''
                                                        }`}
                                                ></div>
                                            )}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <Td key={cell.id} style={{ width: cell.column.getSize() }}>
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
        </>
    )
}

export default FormsAddPercent

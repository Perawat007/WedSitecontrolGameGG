import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Dialog, Button, hooks, Input, Switcher, Select, Table, Avatar, Card } from 'components/ui'
import { Form, Formik, Field } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import "./cssForm.css";
import { useDispatch } from 'react-redux'
import { DataTable } from 'components/shared'
import {
    HiOutlineCash,
    HiOutlineCurrencyDollar,
    HiOutlinePhone,
    HiOutlineUser,
    HiOutlineUserGroup,
    HiCheck,
    HiUserCircle,
    HiLockClosed,
    HiOutlineTrash,
} from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import { StickyFooter } from 'components/shared'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { updatePercent } from '../EditPercent/store/dataSlice'

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

const FormsEditPercent = ({ data = [], valus = '' }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dataPercentarray = [];
    const dataActivearray = [];
    const [sorting, setSorting] = React.useState([])
    const popupRef = useRef(null);

    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.style.display = 'none';
        }

        if (dataPercentarray.length === 0) {
            for (let i = 0; i < valus; i++) {
                const dataPercentStart = {
                    namegame: data[i].gamename,
                    PercentValus: data[i].hold_percentage,
                };

                const dataActiveStart = {
                    namegame: data[i].gamename,
                    activeValue: data[i].status_game,
                };
                dataPercentarray.push(dataPercentStart);
                dataActivearray.push(dataActiveStart)
            }
        }
    }, []);

    const InputColumnAgent = ({ row }) => {
        //string to int
        const percentageString = row.hold_percentage;
        const percentageNumber = parseFloat(percentageString);
        const percentBefo = percentageNumber
        //string to int

        const [values, setNewValues] = useState(90 - percentBefo + '%')
        const handleSelectChange = (event) => {
        };
        const valueStart = [{ options: [{ label: percentBefo + '%' }], }]

        const handleChanges = (newValue) => {
            const percentageString = newValue.label;
            const percentageNumber = parseFloat(percentageString);
            const valusPercent = percentageNumber
            const dataPercent = {
                namegame: row.gamename,
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
        }
        return (
            <div className="container">
            <div className="select-container">
                <p>เปอร์เซ็นของเรา</p>
                <Select
                    defaultValue={valueStart[0].options[0]}
                    onChange={handleChanges}
                    placeholder="Type something..."
                    options={level}
                />
            </div >
            <div className="input-container">
                <p>ส่วนแบ่ง</p>
                <Input
                    value={values}
                    onChange={handleSelectChange}
                    placeholder={'0%'}
                    disabled
                    readOnly
                    className="input-container_input"
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
                            <SwitcherActive row={status} name={row.gamename} />
                        </div>
                    )
                },
            },

            {
                header: 'NameGame',
                cell: (props) => {
                    const { img, symbol, gamename } = props.row.original
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
                            <span>{gamename}</span>
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
        []
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

    const togglePopup = async () => {

        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        const dataPercent = ({
            id: rquestParam.id,
            data: dataPercentarray,
            dataActive: dataActivearray,
        })
        console.log(dataPercent);
        /*const success = await updatePercent(dataPercent)
        if (success.message) {
            navigate('/editDataAgent')
        }*/
    }
    const backpang = () => {
        navigate('/editDataAgent')
    }
    const style = {
        color: 'red',
    };

    const openPopup = () => {
        if (popupRef.current) {
            popupRef.current.style.display = 'block';
        }
    };

    const closePopup = () => {
        if (popupRef.current) {
            popupRef.current.style.display = 'none';
        }
    };

    return (
        <>
            <div ref={popupRef} className="popup">
                <div className="overlay">
                    <div className="modalContainer">
                        <div className="modalRight">
                            <div className="content">
                                <h4 style={style}>ยืนยันการแก้ไข</h4>
                                <br />
                                <h3>คุณต้องการแก้ไขข้อมูลตามนี้ใช่หรือไม่</h3>
                            </div>
                            <div className="btnContainer">
                                <button className="btnPrimary" onClick={togglePopup}>
                                    ตกลง
                                </button>
                                <button className="btnPrimary" onClick={closePopup}>
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Card>
                <div className="flex items-center justify-between mb-6">
                    <h4>รายงานยอดค่าคอมเกม</h4>
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
            <Formik
                initialValues={{
                }}

                onSubmit={(values, { setSubmitting }) => {
                    //onFormSubmit?.(values)
                    setSubmitting(false)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        onClick={() => backpang()}
                                        type="button"
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        onClick={() => openPopup()}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </StickyFooter>

                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default FormsEditPercent

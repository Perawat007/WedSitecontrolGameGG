import React, { forwardRef } from 'react'
import { Input, FormItem, Avatar, FormContainer, Select } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import FormDesription from './FormDesription'
import { AdaptableCard } from 'components/shared'
import FormRow from '../Settings/components/FormRow'
import {useSelector} from 'react-redux'
import { AiOutlineSave } from 'react-icons/ai'
import {
    HiOutlineCash,
    HiOutlineCurrencyDollar,
    HiOutlinePhone,
    HiOutlineUser,
    HiOutlineUserGroup,
    HiCheck,
    HiUserCircle,
    HiLockClosed,
} from 'react-icons/hi'
import { components } from 'react-select'
import * as Yup from 'yup'

dayjs.extend(customParseFormat)
const { Control } = components

const CustomerFormAddAg = forwardRef((props, ref) => {
    const { onFormSubmit } = props

    const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
        return (
            <div
                className={`flex items-center justify-between p-2 ${isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                {...innerProps}
            >
                <div className="flex items-center">
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }

    const CustomControl = ({ children, ...props }) => {
        const selected = props.getValue()[0]
        return (
            <Control {...props}>
                {selected && (
                     <HiOutlineUserGroup className="text-xl" />
                )}
                {children}
            </Control>
        )
    }

    const level = [
        { value: 'Starter', label: 'Starter', icon: HiOutlineUser },
        { value: 'VIP', label: 'VIP' },
        { value: 'VVIP', label: 'VVIP' },
    ]

    const bettypeOptions = [
        { value: 'Agent', label: 'Agent' },
        { value: 'Reseller', label: 'Reseller' },
    ]

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, 'Too Short!')
            .max(30, 'Too Long!')
            .matches(/^[A-Za-z0-9-]*$/, 'Only Letters & Numbers Allowed')
            .required('Name Required'),
        username: Yup.string()
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[A-Za-z0-9-]*$/, 'Only Letters & Numbers Allowed')
            .required('User Name Required'),
        password: Yup.string()
            .required('Password Required')
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
        contact_number: Yup.string()
            .required('Password Required')
            .matches(/^\d{10}$/, 'Invalid phone number'),

        credit: Yup.string()
            .required('Password Required')
            .matches(/^[0-9_-]*$/, 'Only Letters & Numbers Allowed'),
    })

    const idAdmin = useSelector(
        (state) => state.auth.user
    )
    const idUser = idAdmin.id
    console.log(idUser);
    return (
        <Formik
            innerRef={ref}
            initialValues={{
                id_Agent: idUser,
                username: "",
                name: "",
                contact_number: "",
                password: '',
                positiontype: "",
                credit: "",
                level: '',
                currency: 'บาท'
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ values, touched, errors }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="Add Agent "
                                desc="กรุณากรอกข้อมูลของ Agent ให้ครบทุกช่อง"
                            />
                            <FormRow
                                name="id_Agent"
                                label="ID"
                                {...validatorProps}
                            >
                                <Field
                                    name="id_Agent"
                                    component={Input}
                                    prefix={<HiUserCircle className="text-xl" />}
                                    disabled
                                />
                            </FormRow>
                            <FormRow
                                name="username"
                                label="Username"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="username"
                                    placeholder="username"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUser className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="password"
                                label="password"
                                {...validatorProps}
                            >
                                <Field
                                    type="password"
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={Input}
                                    prefix={<HiLockClosed className="text-xl" />}
                                />
                            </FormRow>
                            <FormRow
                                name="name"
                                label="Name"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="name"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUser className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="contact_number"
                                label="Telephone Number"
                                {...validatorProps}
                            >
                                <Field
                                    type="Number"
                                    autoComplete="off"
                                    name="contact_number"
                                    placeholder="Telephone Number"
                                    component={Input}
                                    prefix={
                                        <HiOutlinePhone className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="positiontype"
                                label="ประเภทตำแหน่ง"
                                {...validatorProps}
                                border={false}
                            >
                                <Field name="positiontype">
                                    {({ field, form }) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            placeholder="Please Select"
                                            options={bettypeOptions}
                                            components={{
                                                Option: CustomSelectOption,
                                                Control: CustomControl,
                                            }}
                                            value={bettypeOptions.filter(
                                                (option) =>
                                                    option.value ===
                                                    values?.positiontype
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormRow>

                            <AdaptableCard className="mb-4" divider>
                                <h5>กระเป๋าเงิน</h5>
                                <p className="mb-6">Section to config product sales information</p>
                               
                                <FormItem
                                    label="ระดับ"
                                    invalid={errors.stock && touched.stock}
                                    errorMessage={errors.stock}
                                >
                                    <Field name="level">
                                        {({ field, form }) => (
                                            <Select
                                                field={field}
                                                form={form}
                                                placeholder="Please Select"
                                                options={level}
                                                components={{
                                                    Option: CustomSelectOption,
                                                    Control: CustomControl,
                                                }}
                                                value={level.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values?.level
                                                )}
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        option.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="col-span-1">
                                        <FormItem
                                            label="ยอดเงิน"
                                        >
                                            <Field
                                                type="Number"
                                                autoComplete="off"
                                                name="credit"
                                                placeholder="ยอดเงิน"
                                                component={Input}
                                                prefix={
                                                    <HiOutlineCurrencyDollar className="text-xl" />
                                                }
                                            />
                                        </FormItem>
                                    </div>

                                    <div className="col-span-1">
                                        <FormItem
                                            label="สกุลเงิน"
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="currency"
                                                placeholder="บาท"
                                                component={Input}
                                                prefix={
                                                    <HiOutlineCash className="text-xl" />
                                                }
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                            </AdaptableCard>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
})

export default CustomerFormAddAg

import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import { values } from 'lodash'

import { components } from 'react-select'
import {Input, FormItem, Avatar, Upload, Select} from 'components/ui'
import {
    HiUserCircle,
    HiPhone,
    HiCheck,
    HiOutlineUser,
} from 'react-icons/hi'
import { Field } from 'formik'
import { StatusList } from '../../options.data'
import { useSelector } from 'react-redux'

dayjs.extend(customParseFormat)

const { Control } = components

const PaymentControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <img className="max-w-[35px] ml-2" src={selected.img} alt="" />
            )}
            {children}
        </Control>
    )
}

const PaymentSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`cursor-pointer flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <img className="max-w-[35px]" src={data.img} alt="" />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Too Short!')
        .max(30, 'Too Long!')
        .matches(/^[A-Za-z0-9-]*$/, 'Only Letters & Numbers Allowed')
        .required('Name Required'),
    phoneNumber: Yup.string()
        .required('phone number Required')
        .matches(/^\d{10}$/, 'Invalid phone number'),
})

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    const idAdmin = useSelector(
        (state) => state.auth.user
    )
    const idUser = idAdmin.id

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                id : customer.id || '',
                username: customer.username || '',
                name: customer.name || '',
                phoneNumber: customer.contact_number || '',
                status: customer.status || '',
                idUsers: idUser || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({values, touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Edit
                                </TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                <FormItem
                invalid={errors.upload && touched.upload}
                errorMessage={errors.upload}
            >
                <Field name="img">
                    {({ field, form }) => {
                        const avatarProps = '/img/avatars/pngegglol.png'
                            ? { src: '/img/avatars/pngegglol.png'}
                            : {}
                        return (
                            <div className="flex justify-center">
                                <Avatar
                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                        size={75}
                                        shape="circle"
                                        icon={<HiOutlineUser />}
                                        {...avatarProps}
                                    />
                            </div>
                        )
                    }}
                </Field>
                
            </FormItem>

            <FormItem
                label="Id"
                invalid={errors.id && touched.id}
                errorMessage={errors.id}
            >
                <Field
                    name="id"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                    disabled
                />
            </FormItem>

            <FormItem
                label="Username"
                invalid={errors.username && touched.username}
                errorMessage={errors.username}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="username"
                    placeholder="username"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                    disabled
                />
            </FormItem>
            <FormItem
                label="Name"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="name"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Phone Number"
                invalid={errors.phoneNumber && touched.phoneNumber}
                errorMessage={errors.phoneNumber}
            >
                <Field
                    type="tel"
                    autoComplete="off"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required
                    component={Input}
                    prefix={<HiPhone className="text-xl" />}
                />
            </FormItem>

            <FormItem
               label="Status"
                invalid={errors.status && touched.status}
                errorMessage={errors.status}
                >
                <Field name="status">
                    {({ field, form }) => (
                        <Select
                            components={{
                            Option: PaymentSelectOption,
                            Control: PaymentControl,
                            }}
                                field={field}
                                form={form}
                                options={StatusList}
                                value={StatusList.filter(
                                    (status) =>
                                        status.value ===
                                        values.status
                                )}
                                onChange={(status) => {
                        
                                    form.setFieldValue(
                                    field.name,
                                    status.value
                                )
                            }}
                        />
                    )}
                </Field>
            </FormItem>

                                </TabContent>
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default CustomerForm

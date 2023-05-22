import React, { forwardRef, useEffect, useState } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import { values } from 'lodash'
import { useSelector } from 'react-redux'
import { components } from 'react-select'
import { Input, FormItem, Avatar, Upload, Select } from 'components/ui'
import {
    HiUserCircle,
    HiOutlineLockClosed,
    HiPhone,
    HiCheck,
    HiOutlineUser,
    HiCurrencyDollar
} from 'react-icons/hi'
import { Field } from 'formik'
import { StatusList } from '../../options.data'

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
            className={`cursor-pointer flex items-center justify-between p-2 ${isSelected
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
    id: Yup.string(),
    username: Yup.string().required('User Name Required'),
    phoneNumber: Yup.string().matches(
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
        'Phone number is not valid'
    ),
    status: Yup.string(),
    credit: Yup.string(),
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

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password Required')
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
        newPassword: Yup.string()
            .required('Password Required')
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
        confirmPassword: Yup.string()
            .required('Password Required')
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
    })

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                id: customer.id || '',
                username: customer.username || '',
                password: '',
                newPassword: '',
                confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ values, touched, errors, resetForm }) => (
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
                                                    ? { src: '/img/avatars/pngegglol.png' }
                                                    : {}
                                                return (
                                                    <div className="flex justify-center">
                                                        <Avatar
                                                            className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                            size={80}
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
                                        label="Password เดิม"
                                        invalid={errors.password && touched.password}
                                        errorMessage={errors.password}
                                    >
                                        <Field
                                            type="password"
                                            autoComplete="off"
                                            name="password"
                                            placeholder="password"
                                            component={Input}
                                            prefix={<HiOutlineLockClosed className="text-xl" />}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Password ใหม่"
                                        invalid={errors.newPassword && touched.newPassword}
                                        errorMessage={errors.newPassword}
                                    >
                                        <Field
                                            type="password"
                                            autoComplete="off"
                                            name="newPassword"
                                            placeholder="Password ใหม่"
                                            component={Input}
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required
                                            prefix={<HiOutlineLockClosed className="text-xl" />}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Password ยืนยัน"
                                        invalid={errors.confirmPassword && touched.confirmPassword}
                                        errorMessage={errors.confirmPassword}
                                    >
                                        <Field
                                            type="password"
                                            autoComplete="off"
                                            name="confirmPassword"
                                            placeholder="Password ยืนยันPassword"
                                            component={Input}
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required
                                            prefix={<HiOutlineLockClosed className="text-xl" />}
                                        />
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

import React, { useState } from 'react'
import {
    Input,
    Avatar,
    Upload,
    Button,
    Select,
    Switcher,
    Notification,
    toast,
    FormContainer,
    FormItem,
} from 'components/ui'
import FormDesription from './FormDesription'
import { AdaptableCard } from 'components/shared'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import {
    HiOutlineUserCircle,
    HiOutlineCash,
    HiOutlineCurrencyDollar,
    HiOutlinePhone,
    HiOutlineUser,
    HiOutlineEye,
    HiOutlineUserGroup,
} from 'react-icons/hi'
import * as Yup from 'yup'

const { Control } = components

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
    id: Yup.string()
        .required('Password Required')
        .min(1, 'Too Short!')
        .max(20, 'Too Long!')
        .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
    contact_number: Yup.string()
        .required('Password Required')
        .matches(/^\d{10}$/, 'Invalid phone number'),

    status: Yup.string()
        .required('Password Required')
        .min(1, 'Too Short!'),

    position_type: Yup.string()
        .required('Password Required')
        .min(1, 'Too Short!'),
})

const Profile = (data) => {
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (values, setSubmitting) => {
        toast.push(<Notification title={'Profile updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{
                id: data.data.id,
                username: data.data.username,
                name: data.data.name,
                contact_number: data.data.contact_number,
                status: data.data.status,
                credit: data.data.credit,
                position_type: 'Agent',
                level: 'Agent',
                currency: 'บาท'
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="ข้อมูลส่วนตัว"
                                desc="Basic info, like your name and address that will displayed in public"
                            />
                            <FormRow
                                name="id"
                                label="ID"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="id"
                                    placeholder="Id"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
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
                                    disabled
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
                                    disabled
                                />
                            </FormRow>

                            <FormRow
                                name="contact_number"
                                label="Telephone Number"
                                {...validatorProps}
                            >
                                <Field
                                    type="tel"
                                    autoComplete="off"
                                    name="contact_number"
                                    placeholder="Telephone Number"
                                    component={Input}
                                    prefix={
                                        <HiOutlinePhone className="text-xl" />
                                    }
                                    disabled
                                />
                            </FormRow>

                            <FormRow
                                name="status"
                                label="Status"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="status"
                                    placeholder="Status"
                                    component={Input}
                                    prefix={
                                        <HiOutlineEye className="text-xl" />
                                    }
                                    disabled
                                />
                            </FormRow>

                            <FormRow
                                name="position_type"
                                label="ประเภทตำแหน่ง"
                                {...validatorProps}
                                border={false}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="position_type"
                                    placeholder="ประเภทตำแหน่ง"
                                    component={Input}
                                    prefix={
                                        <HiOutlineEye className="text-xl" />
                                    }
                                    disabled
                                />
                            </FormRow>

                            <AdaptableCard className="mb-4" divider>
                                <h5>ยอดเงิน</h5>
                                <p className="mb-6">Section to config product sales information</p>
                                <FormItem
                                    label="ระดับ"
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="level"
                                        placeholder="Agent"
                                        component={Input}
                                        prefix={
                                            <HiOutlineUserGroup className="text-xl" />
                                        }
                                        disabled
                                    />
                                </FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="col-span-1">
                                        <FormItem
                                            label="ยอดเงิน"
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="credit"
                                                placeholder="ยอดเงิน"
                                                component={Input}
                                                prefix={
                                                    <HiOutlineCurrencyDollar className="text-xl" />
                                                }
                                                disabled
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
                                                disabled
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
}

export default Profile

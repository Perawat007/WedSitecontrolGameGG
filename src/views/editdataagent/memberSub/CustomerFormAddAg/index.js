import React, { forwardRef, useEffect, useState } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Input, FormItem, Avatar, Upload, Select } from 'components/ui'
import { Field } from 'formik'
import * as Yup from 'yup'
import {
    HiUserCircle,
    HiOutlineCurrencyDollar,
    HiPhone,
    HiCheck,
    HiOutlineUser,
    HiCurrencyDollar,
    HiLockClosed,
} from 'react-icons/hi'
import './DropdownList.css';

dayjs.extend(customParseFormat)

const { TabNav, TabList, TabContent } = Tabs

const CustomerFormAddAg = forwardRef((props, ref) => {
    const { onFormSubmit } = props
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState('');

    const pathA = window.location.pathname;
    const pathSegments = pathA.split('/');

    const validationSchema = Yup.object().shape({

        agent_id: Yup.string()
            .required('Password Required')
            .min(1, 'Too Short!')
            .matches(/^[0-9_-]*$/, 'Only Letters & Numbers Allowed'),
        name: Yup.string()
            .min(1, 'Too Short!')
            .max(30, 'Too Long!')
            .matches(/^[A-Za-z0-9-]*$/, 'Only Letters & Numbers Allowed')
            .required('User Name Required'),
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
        credit: Yup.string()
            .required('Credit Required')
            .min(1, 'Too Short!')
            .matches(/^[0-9_-]*$/, 'Only Letters & Numbers Allowed'),
        rememberMe: Yup.bool(),
    })

    function handleSelect(e) {
        if (e.target.value === '--- กรุณา Agent ID ---') {
            setSelectedOption('');
        }
        else {
            setSelectedOption(e.target.value);
        }
    }

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                agent_id: pathSegments[3] || '',
                member_code: '',
                name: '',
                username: '',
                password: '',
                credit: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values, selectedOption)
                setSubmitting(false)
                setTimeout(() => {
                    setSubmitting(false)
                }, 400)
            }}
        >
            {({ touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Add MemBerSub
                                </TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <>
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
                                                                size={100}
                                                                shape="circle"
                                                                icon={<HiOutlineUser />}
                                                                {...avatarProps}
                                                            />
                                                        </div>
                                                    )
                                                }}
                                            </Field>

                                        </FormItem>

                                        {/*
            <FormItem
                label="agent_id"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="number"
                    autoComplete="off"
                    name="agent_id"
                    placeholder="agent_id"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>

             */}

                                        <FormItem
                                            label="ID"
                                            invalid={errors.icon && touched.member_code}
                                            errorMessage={errors.member_code}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="agent_id"
                                                placeholder="id"
                                                component={Input}
                                                prefix={<HiUserCircle className="text-xl" />}
                                                disabled
                                            />
                                        </FormItem>

                                        <FormItem
                                            label="member_code"
                                            invalid={errors.member_code && touched.member_code}
                                            errorMessage={errors.member_code}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="username"
                                                placeholder="member_code"
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
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="password"
                                            invalid={errors.password && touched.password}
                                            errorMessage={errors.password}
                                        >
                                            <Field
                                                type="password"
                                                autoComplete="off"
                                                name="password"
                                                placeholder="Password"
                                                component={Input}
                                                prefix={<HiLockClosed className="text-xl" />}
                                            />
                                        </FormItem>

                                        <FormItem
                                            label="name"
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

                                        <div className="col-span-1">
                                            <FormItem
                                                label="credit"
                                                invalid={errors.credit && touched.credit}
                                                errorMessage={errors.credit}
                                            >
                                                <Field
                                                    type="Number"
                                                    autoComplete="off"
                                                    name="credit"
                                                    placeholder="ยอดเงิน"
                                                    component={Input}
                                                    prefix={<HiOutlineCurrencyDollar className="text-xl" />}
                                                />
                                            </FormItem>
                                        </div>
                                    </>
                                </TabContent>
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default CustomerFormAddAg

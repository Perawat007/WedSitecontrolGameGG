import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import { values } from 'lodash'
import { useSelector } from 'react-redux'
import { components } from 'react-select'
import { Input, FormItem, Avatar, Upload, Select } from 'components/ui'
import {
    HiUserCircle,
    HiLocationMarker,
    HiCheck,
    HiCake,
    HiOutlineUser,
    HiCurrencyDollar,
    HiOutlineUserGroup,
} from 'react-icons/hi'
import { Field } from 'formik'

dayjs.extend(customParseFormat)
const { Control } = components

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
const status = [
    { value: 'Y', label: 'Y', icon: HiOutlineUser },
    { value: 'N', label: 'N' , icon: HiOutlineUser},
]

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .min(1, 'Too Short!')
            .required('User Name Required'),
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
    })

    const idAdmin = useSelector(
        (state) => state.auth.user
    )
    const idUser = idAdmin.id

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                id: customer.id || '',
                username: customer.username || '',
                name: customer.name || '',
                status: customer.status || '',
                credit: customer.credit || '',
            }}
            //validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log('on');
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ values, touched, errors}) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Edit Member
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
                                                            size={50}
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
                                        invalid={errors.name && touched.name}
                                        errorMessage={errors.name}
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
                                    <FormItem
                                        label="Credit"
                                        invalid={errors.location && touched.location}
                                        errorMessage={errors.location}
                                    >
                                        <Field
                                            type="Number"
                                            autoComplete="off"
                                            name="credit"
                                            placeholder="credit"
                                            component={Input}
                                            prefix={<HiCurrencyDollar className="text-xl" />}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="การเปิดใช้งาน"
                                    >
                                        <Field name="status">
                                            {({ field, form }) => (
                                                <Select
                                                    field={field}
                                                    form={form}
                                                    placeholder="Please Select"
                                                    options={status}
                                                    components={{
                                                        Option: CustomSelectOption,
                                                        Control: CustomControl,
                                                    }}
                                                    value={status.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values?.status
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

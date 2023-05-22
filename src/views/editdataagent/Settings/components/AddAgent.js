import React, { useState} from 'react'
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
import cloneDeep from 'lodash/cloneDeep'
import FormDesription from './FormDesription'
import { AdaptableCard } from 'components/shared'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import { AiOutlineSave } from 'react-icons/ai'
import { components } from 'react-select'
import {
    HiOutlineUserCircle,
    HiOutlineCash,
    HiOutlineCurrencyDollar,
    HiOutlinePhone,
    HiOutlineUser,
    HiOutlineEye,
    HiOutlineUserGroup,
    HiCheck,
    HiUserCircle,
} from 'react-icons/hi'
import * as Yup from 'yup'

const { Control } = components

const statusOptions = [
    { value: 'Y', label: 'Active' },
    { value: 'N', label: 'Block'},
]

const bettypeOptions = [
    { value: 'Agent', label: 'Agent' },
    { value: 'Reseller', label: 'Reseller'},
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

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Avatar shape="circle" size={20} src={data.imgPath} />
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
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={18}
                    src={selected.imgPath}
                />
            )}
            {children}
        </Control>
    )
}


const AddSubAgentFrom = (data) => {
   
    const onFormSubmit = (values, setSubmitting) => {
        console.log('on');
        const {
            id_Agent,
            name,
            username,
            password,
            contact_number,
            credit,
            status,
            positiontype,
        } = values

        const basicInfo = {id_Agent, name, username, password, contact_number, credit, status, positiontype}
        const personalInfo = {
            id_Agent,
            name,
            username,
            password,
            contact_number,
            credit,
            status,
            positiontype,
        }
       
        toast.push(<Notification title={'AddSubAgentFrom updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)   
    }

    return (
        <Formik
            initialValues={{
                id_Agent : data.data.id || '',
                username: "",
                name : "",
                contact_number : "",
                status : "",
                positiontype : "",
                credit : "",
                level: 'Agent',
                currency: 'บาท'
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values, 'On');
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ values, touched, errors, isSubmitting}) => {
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
                                name="telephone number"
                                label="Telephone Number"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
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
                                name="status"
                                label="Status"
                                {...validatorProps}
                            >
                                <Field name="status">
                                    {({ field, form }) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            placeholder="Please Select"
                                            options={statusOptions}
                                            components={{
                                                Option: CustomSelectOption,
                                                Control: CustomControl,
                                            }}
                                            value={statusOptions.filter(
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
                                     invalid={errors.stock && touched.stock}
                                     errorMessage={errors.stock}
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
                                />
                                </FormItem>
                            </div>

                            <div className="col-span-1">
                                <FormItem
                                     label="สกุลเงิน"
                                     invalid={errors.stock && touched.stock}
                                     errorMessage={errors.stock}
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

                            <div className="mt-4 ltr:text-right">
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        //loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                            </div>
                            </AdaptableCard>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AddSubAgentFrom

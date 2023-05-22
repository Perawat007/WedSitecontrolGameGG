import React, { forwardRef, useState } from 'react'
import { FormContainer, Button, hooks, Input, FormItem, Select } from 'components/ui'
import FormRow from './FormRow'
import FormDesription from './FormDesription'
import { Form, Formik, Field } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
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
import { components } from 'react-select'
import { AdaptableCard, StickyFooter } from 'components/shared'
import * as Yup from 'yup'

const { useUniqueId } = hooks
const { Control } = components
const level = [
    { value: 'Stater', label: 'Stater', icon: HiOutlineUser },
    { value: 'VIP', label: 'VIP' },
    { value: 'VVIP', label: 'VVIP' },
]

const rank = [
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
    passwordNew: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed')
        .required('Password Required'),
    contact_number: Yup.string()
        .required('Password Required')
        .matches(/^\d{10}$/, 'Invalid phone number'),

    credit: Yup.string()
        .required('Password Required')
        .matches(/^[0-9_-]*$/, 'Only Letters & Numbers Allowed'),
})

const ProductForm = forwardRef((props, ref) => {
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

    const { type, initialData, onFormSubmit, onDiscard, onDelete } = props

    const newId = useUniqueId('product-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    tags: initialData?.tags
                        ? initialData.tags.map((value) => ({
                            label: value,
                            value,
                        }))
                        : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    formData.tags = formData.tags.map((tag) => tag.value)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
               {({ values, touched, errors, isSubmitting }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="Edit SubAgent "
                                desc="กรุณากรอกข้อมูลให้ครบทุกช่อง"
                            />
                            <FormRow
                                name="id"
                                label="ID"
                                {...validatorProps}
                            >
                                <Field
                                    name="id"
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
                                    disabled
                                />
                            </FormRow>
                            <FormRow
                                name="passwordNew"
                                label="password"
                                {...validatorProps}
                            >
                                <Field
                                    type="password"
                                    autoComplete="off"
                                    name="passwordNew"
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
                                name="rank"
                                label="ประเภทตำแหน่ง"
                                {...validatorProps}
                                border={false}
                            >
                                <Field name="rank">
                                    {({ field, form }) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            placeholder="Please Select"
                                            options={rank}
                                            components={{
                                                Option: CustomSelectOption,
                                                Control: CustomControl,
                                            }}
                                            value={rank.filter(
                                                (option) =>
                                                    option.value ===
                                                    values?.rank
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

                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        onClick={() => onDiscard?.()}
                                        type="button"
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>

                        </FormContainer>
                    </Form>
                )
            }}
            </Formik>
        </>
    )
})

ProductForm.defaultProps = {
    type: 'edit',
    initialData: {
        id: '',
        name: '',

    },
}

export default ProductForm

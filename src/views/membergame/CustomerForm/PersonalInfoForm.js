//EditData Agent
import React from 'react'
import { DatePicker, Input, FormItem, Avatar, Upload } from 'components/ui'
import {
    HiUserCircle,
    HiLocationMarker,
    HiOutlineUser,
} from 'react-icons/hi'
import { Field } from 'formik'

const PersonalInfoForm = (props) => {
    const { touched, errors } = props

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    return (
        <>
            <FormItem
                invalid={errors.upload && touched.upload}
                errorMessage={errors.upload}
            >
                <Field name="img">
                    {({ field, form }) => {
                        const avatarProps = '/img/avatars/thumb-6.jpg'
                            ? { src: '/img/avatars/thumb-6.jpg'}
                            : {}
                        return (
                            <div className="flex justify-center">
                                <Upload
                                    className="cursor-pointer"
                                    onChange={(files) =>
                                        onSetFormFile(form, field, files)
                                    }
                                    onFileRemove={(files) =>
                                        onSetFormFile(form, field, files)
                                    }
                                    showList={false}
                                    uploadLimit={1}
                                >
                                    <Avatar
                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                        size={100}
                                        shape="circle"
                                        icon={<HiOutlineUser />}
                                        {...avatarProps}
                                    />
                                </Upload>
                            </div>
                        )
                    }}
                </Field>
            </FormItem>
            <FormItem
                label="Id"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    name="id"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="member_code"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="member_code"
                    placeholder="member_code"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
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
                />
            </FormItem>
            <FormItem
                label="Status"
                invalid={errors.location && touched.location}
                errorMessage={errors.location}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="status"
                    placeholder="Status"
                    component={Input}
                    prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Balance"
                invalid={errors.location && touched.location}
                errorMessage={errors.location}
            >
                <Field
                    type="Number"
                    autoComplete="off"
                    name="balance"
                    placeholder="balance"
                    component={Input}
                    prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
        </>
    )
}

export default PersonalInfoForm

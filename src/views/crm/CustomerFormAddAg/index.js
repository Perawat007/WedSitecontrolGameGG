import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import PersonalInfoForm from './PersonalInfoForm'
import * as Yup from 'yup'

dayjs.extend(customParseFormat)

const { TabNav, TabList, TabContent } = Tabs

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
    phoneNumber: Yup.string()
        .required('Password Required')
        .matches(/^\d{10}$/, 'Invalid phone number'),
})

const CustomerFormAddAg = forwardRef((props, ref) => {
    const { onFormSubmit } = props

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                name : '',
                username: '',
                password:'',
                phoneNumber:'',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Add Admin
                                </TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                    />
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

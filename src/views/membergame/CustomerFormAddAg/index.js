import React, { forwardRef,useEffect, useState } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import PersonalInfoForm from './PersonalInfoForm'
import { Input, FormItem, Avatar, Upload ,Select} from 'components/ui'
import { Field } from 'formik'
import * as Yup from 'yup'
import { values } from 'lodash'
import { components } from 'react-select'
import {
    HiUserCircle,
    HiLocationMarker,
    HiPhone,
    HiCheck,
    HiOutlineUser,
    HiCurrencyDollar,
    HiLockClosed,
} from 'react-icons/hi'
import { StatusList } from '../../options.data'
import './DropdownList.css';

dayjs.extend(customParseFormat)

const { TabNav, TabList, TabContent } = Tabs

const CustomerFormAddAg = forwardRef((props, ref) => {
    const { onFormSubmit} = props

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('https://relaxtimecafe.fun/list_idAgent');
          const dataID = await response.json();
          setData(dataID.data);
          setLoading(false);
        }
        fetchData();
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, 'Too Short!')
            .max(30, 'Too Long!')
            .matches(/^[A-Za-z0-9-]*$/, 'Only Letters & Numbers Allowed')
            .required('User Name Required'),
        username: Yup.string()
            .min(1, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[A-Za-z0-9-]*$/, 'Only Letters & Numbers Allowed')
            .required('User Name Required'),
        password: Yup.string()
            .required('Password Required')
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
        rememberMe: Yup.bool(),
    })

    function handleSelect(e) {
        if (e.target.value === '--- กรุณา Agent ID ---'){
            setSelectedOption('');
        }
        else{
            setSelectedOption(e.target.value);
        }
    } 

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                agent_id: '',
                member_code: '',
                name : '',
                username: '',
                password:'',
                IdAgent:'',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values, selectedOption)
                setSubmitting(false)
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
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
                                    Add MemBer
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
                        ? { src: '/img/avatars/pngegglol.png'}
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
            
            
            <FormItem>
            <div className="dropdown-container">
             <label className="dropdown-label" htmlFor="dropdown">agent_id</label>
             <select className="dropdown-list" onChange={(e) => handleSelect(e)}>
             <option className='selected-item' value={null}>--- กรุณา Agent ID ---</option>
                {data.map((item, index) => (
            <option className='dropdown-op' key={index} value={item.id}>{`${item.id}`}</option>
             ))}
            </select>
            </div>
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
                label="member_code"
                invalid={errors.member_code && touched.member_code}
                errorMessage={errors.member_code}
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
            {error && <p>{error}</p>}
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

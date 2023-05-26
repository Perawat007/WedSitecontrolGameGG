import React, { useState } from 'react'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import nft from "./nft.jpg";
import "./login.css";
import Logo from 'components/template/Logo'
import logoDog from "./logo-dark-full.png"

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your user name'),
    password: Yup.string().required('Please enter your password'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props) => {
    const {
        disableSubmit = false,
        className,
    } = props

    const [message, setMessage] = useState(false)

    const { signIn } = useAuth()

    const backgroundImage = {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        height: '55vh',
        display: 'flex',
        backdropFilter: 'blur(10px)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        border: '5px',
        borderRadius: '20px',
        textAlign: 'center'

    };

    const logoDogzilla = {
        width : '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'

    };

    const onSignIn = async (values, setSubmitting) => {
        const { username, password } = values
        setSubmitting(true)

        const result = await signIn({ username, password })
        if (result.status === 'failed') {
            setMessage(true);
        }
        setSubmitting(false)
    }
    const style = {
        color: 'red',
    };

    const togglePopup = () => {
        setMessage(!message);
    };

    return (
        <div>
            {message && (
                <div className="overlay">
                    <div className="modalContainer">
                        <img src={nft} alt="/" />
                        <div className="modalRight">
                            <div className="content">
                                <p style={style}>Username หรือ Password ผิด</p>
                                <br />
                                <h3>กรุณากรอก</h3>
                                <h3>username และ Passwordใหม่</h3>
                            </div>
                            <div className="btnContainer">
                                <button className="btnPrimary" onClick={togglePopup}>
                                    ตกลง
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={className}>
                <div style={backgroundImage}>
                    <div className="xl:min-w-[250px] px-8">
                        <div className="mb-6 flex items-center gap-4">
                        <img src={logoDog} alt="/" style={logoDogzilla}/>
                        </div>
                        <Formik
                            // Remove this initial value
                            initialValues={{
                                username: 'agent01',
                                password: '123456789',
                                rememberMe: true,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                if (!disableSubmit) {
                                    onSignIn(values, setSubmitting)
                                } else {
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ touched, errors, isSubmitting }) => (
                                <Form>
                                    <FormContainer>
                                        <FormItem
                                            label="UserName"
                                            invalid={errors.username && touched.username}
                                            errorMessage={errors.username}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="username"
                                                placeholder="User Name"
                                                style={{ color: 'white' }}
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Password"
                                            invalid={errors.password && touched.password}
                                            errorMessage={errors.password}
                                        >
                                            <Field
                                                autoComplete="off"
                                                name="password"
                                                placeholder="Password"
                                                style={{ color: 'white' }}
                                                component={PasswordInput}
                                            />
                                        </FormItem>
                                        <Button
                                            block
                                            loading={isSubmitting}
                                            variant="solid"
                                            type="submit"
                                        >
                                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                                        </Button>
                                    </FormContainer>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInForm

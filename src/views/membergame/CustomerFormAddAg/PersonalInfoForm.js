//EditData Agent
import React, {useEffect, useState} from 'react'
import { Input, FormItem, Avatar, Upload } from 'components/ui'
import {
    HiUserCircle,
    HiLocationMarker,
    HiOutlineUser,
    HiLockClosed,
} from 'react-icons/hi'
import { Field } from 'formik'

const PersonalInfoForm = (props) => {
    const { touched, errors } = props

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('http://localhost:5000/list_idAgent');
          const dataID = await response.json();
          setData(dataID.data);
          setLoading(false);
        }
        fetchData();
    }, []);

    function handleSelect(e) {
        console.log(e.target.value);
        setSelectedOption(e.target.value);
    }

    return (
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
            
            <div>
                <select value={selectedOption} onChange={handleSelect}>
                <option value="">Select an option</option>
                 {loading ? (
                 <option value="">Loading...</option>
                    ) : (
                    data.map((item) => (
                    <option key={item.id} value={item.id}>
                     {item.name}
                    </option>
             ))
         )}
      </select>
    </div>
   
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
                    name="username"
                    placeholder="username"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="password"
                invalid={errors.location && touched.location}
                errorMessage={errors.location}
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
    )
}

export default PersonalInfoForm

import React from 'react';
import './mainpage.css';
import { Link } from 'react-router-dom';
import { UserInfo } from './UserInfo/UserInfo.tsx';
import { Field, Form, Formik } from 'formik';
import InputMask from 'react-input-mask';

import * as Yup from 'yup';
import { useEffect } from 'react';

const UserSchema = Yup.object().shape({
    email: Yup.string()
        .email('Не корректный Email')
        .matches(/\.+[a-zA-Z]{2,6}$/, 'Не корректный Email')
        .required('поле обязательно для заполнения'),
    phone: Yup.string()
        .required('поле обязательно для заполнения')
        .length(18, 'Не корректный номер телефона'),
})

interface IMainPage {
    userName: string
}

export function MainPage({ userName }: IMainPage) {

    useEffect(() => {
        document.getElementById('button-start')?.classList.add('disabled') ;      
    }, [])
    return (
        <div className='layout'>
            <UserInfo username={userName}/>
            <Formik
                initialValues={{ phone: '', email: '' }}
                validationSchema={UserSchema}
                onSubmit={values => {
                // same shape as initial values
                console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form  className='introForm'>

                        <label htmlFor="phoneNumber" className='inputLabel' >Номер телефона</label>
                        {errors.phone && touched.phone && (
                            <div className='formInvalidtext'>{errors.phone}</div>
                        )}
                        <Field name="phone">
                            {
                            ({ field }) => 
                            <InputMask 
                                {...field}
                                id="phoneNumber"
                                type="text"
                                mask="+9 (999) 999-99-99"
                                maskChar={null}
                                placeholder='+7 (999) 999-99-99'
                                className={`input ${errors.phone && touched.phone ? 'formInvalid' : ''}`}
                            />
                            }
                        </Field>

                        <label htmlFor="Email" className='inputLabel' >Email</label>
                        {errors.email && touched.email && (
                            <div className='formInvalidtext'>{errors.email}</div>
                        )}
                        <Field 
                            name="email" 
                            type="email" 
                            id="Email"
                            placeholder='my.email@example.com'                        
                            className={`input ${errors.email && touched.email ? 'formInvalid' : ''}`}
                        />

                        <Link id="button-start" to="/create" type='submit' className={`button ${errors.phone || errors.email ? 'disabled' : ''}`}>Начать</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

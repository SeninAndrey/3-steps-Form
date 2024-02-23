import React, { useState } from 'react';
import './formstep3.css';
import { Field, Form, Formik } from 'formik';
import { handleFormSumbmit,  } from '../FormStep1/FormStep1.tsx';
import { useDispatch, useSelector } from "react-redux";
import { updateThirdStep } from "../../../Store/formSlice.ts";
import { Modal } from '../../Modal/Modal.tsx';
import { RootState } from '../../../Store/store.ts';
import { ThirdPage } from '../../../Yup.ts';

export interface IThirdStep {
    about: string
}

export function FormStep3() {
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const dispatch = useDispatch();
    const form = useSelector((state: RootState) => state.form.thirdStep);
    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateThirdStep({ field, value: event.target.value }));
    }

    return (
        <>
            <Formik
                initialValues={form}
                enableReinitialize={true}
                validationSchema={ThirdPage}
                validateOnMount
                validateOnBlur
                onSubmit={handleFormSumbmit}
            >
                {({ values, errors, touched, isValid }) => (
                    <Form  className='form3'>
                        <label htmlFor="about" className='inputLabel'>About</label>
                        {errors.about && touched.about && (
                            <div className='formInvalidtext'>{errors.about}</div>
                        )}
                        <Field 
                            component="textarea"
                            name="about"
                            id="field-about"
                            placeholder='Placeholder'
                            onChange={handleChange('about')}
                            values={form.about}
                            className={`textarea3 ${errors.about && touched.about ? 'formInvalid' : ''}`}
                        />
                        <span className='sybmolCounter'>
                            {`осталось 
                            ${200 - values.about.split(' ').join('').length >= 0 
                            ? (200 - values.about.split(' ').join('').length) 
                            : 0} символов`}
                        </span>
                        <button type="submit"  id='button-next'  className='btn nextButton' onClick={() => { 
                            if (isValid) {
                                setIsModalOpened(true);
                            }
                        }}
                        >                            
                            Отправить
                        </button>
                        {isModalOpened && (
                            <Modal 
                                onClose={() => {setIsModalOpened(false)}} 
                                // isSuccess={false} 
                                isSuccess={true}
                            />
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );
}

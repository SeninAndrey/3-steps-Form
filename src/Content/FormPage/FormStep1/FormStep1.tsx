import React from 'react';
import './formstep1.css';
import { SelectSex } from './Select/Select.tsx';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { updateFirstStep } from "../../../Store/formSlice.ts";
import { RootState } from '../../../Store/store';
import { ISetStep } from '../FormPage.tsx';
import { ISecondStep } from '../FormStep2/FormStep2.tsx';
import { IThirdStep } from '../FormStep3/FormStep3.tsx';
import { FirstPage } from '../../../Yup.ts';

export interface IFirstStep {
    nickname: string, 
    name: string, 
    surname: string, 
    sex?: string
}

type ISubmitValues = IFirstStep | ISecondStep | IThirdStep

export type SelectSexType = {
    value: string;
    label: string;
    id: string;
}

const options: Array<SelectSexType> = [
    { value: 'man', label: 'man', id: 'fieid-sex-option-man' },
    { value: 'woman', label: 'woman', id: 'fieid-sex-option-woman' },
];

export function handleFormSumbmit (values: ISubmitValues) {      
    // alert(JSON.stringify(values, null, 2)); 
    console.log(JSON.stringify(values, null, 2));
}

export function FormStep1({ setActiveStep }: ISetStep ) {
    const dispatch = useDispatch();
    const form = useSelector((state: RootState) => state.form.firstStep);

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateFirstStep({ field, value: event.target.value }));
    }

    return (
        <div>
            <Formik
                initialValues={form}
                enableReinitialize={true}
                validationSchema={FirstPage}
                validateOnMount
                validateOnBlur
                onSubmit={handleFormSumbmit}
            >
                {({ values, errors, touched, setFieldTouched, setFieldValue, isValid }) => (
                    <Form className='form1'>
                        <label htmlFor="nickname" className='inputLabel'>Nickname</label>
                        {errors.nickname && touched.nickname && (
                            <div className='formInvalidtext'>{errors.nickname}</div>
                        )}
                        <Field 
                            name="nickname"
                            id="field-nickname"
                            type="text"
                            placeholder='Placeholder'
                            onChange={handleChange('nickname')}
                            value={form.nickname}
                            className={`inputForm1 ${errors.nickname && touched.nickname ? 'formInvalid' : ''}`}
                        />
                        <label htmlFor="name" className='inputLabel'>Name</label>
                        {errors.name && touched.name && (
                            <div className='formInvalidtext'>{errors.name}</div>
                        )}
                        <Field 
                            name="name"
                            id="field-name"
                            type="text"
                            placeholder='Placeholder'
                            onChange={handleChange('name')}
                            value={form.name}
                            className={`inputForm1 ${errors.name && touched.name ? 'formInvalid' : ''}`}
                        /> 
                        <label htmlFor="surname" className='inputLabel'>Surname</label>
                        {errors.surname && touched.surname && (
                            <div className='formInvalidtext'>{errors.surname}</div>
                        )}
                        <Field 
                            name="surname"
                            id="field-surname"
                            type="text"
                            placeholder='Placeholder'
                            onChange={handleChange('surname')}
                            value={form.surname}
                            className={`inputForm1 ${errors.surname && touched.surname ? 'formInvalid' : ''}`}
                        />
                        <label htmlFor="sex" className='inputLabel'>Sex</label>
                        {touched.sex && errors.sex &&  (
                            <div className='formInvalidtext'>{errors.sex}</div>
                        )}
                        <Field 
                            component={SelectSex} 
                            setFieldTouched={setFieldTouched} 
                            options={options}
                            onChange={(value: SelectSexType) => setFieldValue('sex', value.value)}
                            value={form.sex}
                            styleClass={`${touched.sex && errors.sex ? 'selectInvalid' : ''}`}
                        />
                        <button 
                            type="submit" 
                            id='button-next'  
                            className='btn nextButton' 
                            onClick={() => {  
                                if (isValid) {
                                    handleFormSumbmit(values);
                                    setActiveStep(1);
                                }
                            }}
                        >
                            Далее
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

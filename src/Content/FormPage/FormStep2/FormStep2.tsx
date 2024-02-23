import React from 'react';
import './formstep2.css';
import { Field, FieldArray, Form, Formik } from 'formik';
import { handleFormSumbmit } from './../FormStep1/FormStep1.tsx';
import { useDispatch, useSelector } from "react-redux";
import { updateSecondStep } from "../../../Store/formSlice.ts";
import { RootState } from '../../../Store/store';
import { ISetStep } from '../FormPage.tsx';
import { SecondPage } from '../../../Yup.ts';

export interface ISecondStep {
    advantages: string[], 
    checked: number[], 
    picked: number | null 
}

export function FormStep2( { setActiveStep }: ISetStep ) {
    const dispatch = useDispatch();
    const form = useSelector((state: RootState) => state.form.secondStep);

    // checkboxes and radio buttons manage
    const handleChangeCheckRadio = (field: string, value: number | number[]) => {
        dispatch(updateSecondStep({ field, value: typeof value === 'number' ? value : (value.sort((a, b) => {return a - b})) }));
    }
    const deleteCheck = (value: number) => {return form.checked.filter((check) => check !== value)}
    const addCheck = (value: number) => {return [...form.checked, value]}

    // advantages manage
    const handleChangeAdvantage = (field: string, value: string[]) => {
        dispatch(updateSecondStep({ field, value: value }));
    }
    const deleteAdvantage = (indexToDelete: number) => {
        return form.advantages.filter((advant, index) => index !== indexToDelete)
    }
    const addAdvantage = (value: string) => {
        return [...form.advantages, value]
    }
    const editAdvantage = (indexToEdit: number, newValue: string) => {
        return [...form.advantages].map((value, index) => {
            if (index === indexToEdit) { return newValue } 
            else { return value }
        })
    }

    return (
        <>  
            <Formik
                initialValues={form}
                enableReinitialize={true}
                validationSchema={SecondPage}
                validateOnMount
                validateOnBlur
                onSubmit={handleFormSumbmit}
            >
                {({ values, errors, touched, isValid }) => (
                <Form className='form2'>  
                    <div className='advantageGroup'>
                    <p className='groupHeader'>Advantages</p>
                    <FieldArray
                        name="advantages"
                        render={() => (
                            <ul className='advantageList'>
                                { form.advantages.map((advantage, index) => (
                                    <li 
                                        className='advantageListItem' 
                                        key={index}>
                                        {errors.advantages && touched.advantages && !advantage && (
                                            <div className='formInvalidtext'>{errors.advantages[index]}</div>
                                        )}
                                        <div className='advantageListItemInput'>
                                        <Field 
                                            name={`advantages.${index}`} 
                                            id={`field-advantage-${index}`}
                                            type="text"
                                            placeholder='Placeholder'
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                handleChangeAdvantage('advantages', editAdvantage(index, event.target.value));
                                            }}
                                            value={form.advantages[index]}
                                            className={
                                                `advantageListInput ${errors.advantages && touched.advantages && !advantage
                                                ? 'formInvalid' 
                                                : ''}`
                                            }
                                        />
                                        <button
                                            type="button"
                                            id={`button-remove-${index + 1}`}
                                            className='deleteItem' 
                                            onClick={() => {
                                                handleChangeAdvantage('advantages', deleteAdvantage(index));
                                            }} 
                                        > 
                                        </button>
                                        </div>
                                    </li>
                                ))} 
                                <button 
                                    type="button" 
                                    id="button-add" 
                                    className='addInput' 
                                    onClick={() => {
                                        handleChangeAdvantage('advantages', addAdvantage(''));
                                    }}
                                >
                                </button>
                            </ul>
                        )}
                    />
                    </div>  
                        <div id="checkbox-group" className='groupHeader'>Checkbox group</div>
                        <div 
                            role="group" 
                            aria-labelledby="checkbox-group" 
                            className='checkBoxGroup'
                        >
                        <label className='label'>
                            <Field 
                                type="checkbox" 
                                name="checked" 
                                value="1" 
                                id="field-checkbox-group-option-1" 
                                className='checkbox'
                                onChange={() => {
                                    handleChangeCheckRadio('checked', form.checked.includes(1) ? deleteCheck(1) : addCheck(1));
                                }}
                                checked={values.checked.includes(1)}                                
                            />
                            1
                        </label>
                        <label className='label'>
                            <Field 
                                type="checkbox" 
                                name="checked" 
                                value="2" 
                                id="field-checkbox-group-option-2" 
                                className='checkbox'
                                onChange={() => {
                                    handleChangeCheckRadio('checked', form.checked.includes(2) ? deleteCheck(2) : addCheck(2));
                                }}
                                checked={values.checked.includes(2)}
                            />
                            2
                        </label>
                        <label className='label'>
                            <Field 
                                type="checkbox" 
                                name="checked" 
                                value="3" 
                                id="field-checkbox-group-option-3" 
                                className='checkbox'
                                onChange={() => {
                                    handleChangeCheckRadio('checked', form.checked.includes(3) ? deleteCheck(3) : addCheck(3));
                                }}
                                checked={values.checked.includes(3)}
                            />
                            3
                        </label>
                        {errors.checked && touched.checked && (
                            <div className='formInvalidtext'>{errors.checked}</div>
                        )}
                    </div>
                    <div id="radio-group" className='groupHeader'>Radio group</div>
                    <div role="group" aria-labelledby="my-radio-group" className='checkBoxGroup'>
                        <label className='label'>
                            <Field 
                                type="radio" 
                                name="picked" 
                                value="1" 
                                id="field-radio-group-1" 
                                className='radiobutton'   
                                onClick={() => {
                                    handleChangeCheckRadio('picked', 1);
                                }}     
                                checked =  { form.picked === 1 }                   
                            />
                            1
                        </label>
                        <label className='label'>
                            <Field 
                                type="radio" 
                                name="picked" 
                                value="2" 
                                id="field-radio-group-2" 
                                className='radiobutton'
                                onChange={() => {
                                    handleChangeCheckRadio('picked', 2);
                                }}
                                checked = { form.picked === 2 }
                            />
                            2
                        </label>
                        <label className='label'>
                            <Field 
                                type="radio" 
                                name="picked" 
                                value="3" 
                                id="field-radio-group-3" 
                                className='radiobutton'
                                onChange={() => {
                                    handleChangeCheckRadio('picked', 3);
                                }}
                                checked = { form.picked === 3 }
                            />
                            3
                        </label>
                        {errors.picked && touched.picked && (
                            <div className='formInvalidtext'>{errors.picked}</div>
                        )}
                    </div>
                    <button 
                        type="submit"  
                        id='button-next'  
                        className='btn nextButton' 
                        onClick={() => {  
                            if (isValid) {
                                handleFormSumbmit(values);
                                setActiveStep(2);
                            } 
                        }}
                    >
                        Далее
                    </button>
                </Form>
                )}
            </Formik>  
        </>
    );
}

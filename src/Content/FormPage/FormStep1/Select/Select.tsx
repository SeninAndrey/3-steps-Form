import React from 'react';
import './select.css';
import Select from 'react-select';
import { updateFirstStep } from '../../../../Store/formSlice.ts';
import { useDispatch } from 'react-redux';
import { SelectSexType } from '../FormStep1.tsx';

interface ISelectSex {
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => Promise<void>,
    styleClass: string,
    options: Array<SelectSexType> 
    // onChange: (value: SelectSexType | string) => void
    onChange: (value: SelectSexType ) => void
    value?: string
}
  
export function SelectSex({setFieldTouched, styleClass, options, onChange, value}: ISelectSex) {

    function defaultValue(options: Array<SelectSexType>, value: string) {
        return options ? options.find(option => option.value === value) : ''
    }
    const dispatch = useDispatch();

    return (
        <div className={`select ${styleClass}`}>
            <Select
                name="sex"
                id='field-sex'
                placeholder={'Не выбрано'}
                // defaultValue={null}
                onChange={(value) => {
                    if (!value) {return}
                    onChange(value);
                    dispatch(updateFirstStep({ field:'sex', value: value.value }));
                    // dispatch(updateFirstStep({ field:'sex', value: typeof value === 'string' ? value : value.value }));
                    }
                }
                value={defaultValue(options, value)}
                onBlur={() => {setFieldTouched('sex', true)}}
                options={options}
            />
        </div>
    );
}

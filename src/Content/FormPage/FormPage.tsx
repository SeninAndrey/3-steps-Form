import React from 'react';
import { FormStep1 } from './FormStep1/FormStep1.tsx';
import { FormStep2 } from './FormStep2/FormStep2.tsx';
import { FormStep3 } from './FormStep3/FormStep3.tsx';

export interface ISetStep {
    setActiveStep: TSetStep
}

type TSetStep =
    (arg: number) => void

export function FormPage(step: number, setActiveStep: TSetStep) {
        switch(step) {
            case 0: 
                return (
                    <FormStep1 setActiveStep={setActiveStep}/>
                )
            case 1:
                return (
                    <FormStep2 setActiveStep={setActiveStep}/>
                )
            case 2:
                return (
                    <FormStep3/>
                )
            default: 
                return null
          }
    
}

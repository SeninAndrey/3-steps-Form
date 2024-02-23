import React, { useState } from 'react';
import "./layout.css";
import { Link } from 'react-router-dom';
import { Stepper } from 'react-form-stepper';
import { FormPage } from '../Content/FormPage/FormPage.tsx';

export function Layout() {
    const [activeStep, setActiveStep] = useState<number>(0);

    const steps = [
        { label: '1', onClick: () => setActiveStep(0) },
        { label: '2', onClick: () => setActiveStep(1) },
        { label: '3', onClick: () => setActiveStep(2) },
    ];

    return (
        <div className='layoutForm'>
            <Stepper steps={steps} activeStep={activeStep} connectorStateColors={true}/>
            
            { FormPage(activeStep, setActiveStep) }
            <div className='formControls'>
                { activeStep === 0 &&  
                    <Link 
                        id="button-back" 
                        to="/" 
                        className='btn prevButton'
                    >
                        Назад
                    </Link>
                }
                { activeStep !== 0 &&  
                    <button 
                        className='btn prevButton' 
                        id='button-back' 
                        onClick={() => setActiveStep(activeStep - 1)}
                    >
                        Назад
                    </button> 
                }
            </div>
        </div >
    );
}
   

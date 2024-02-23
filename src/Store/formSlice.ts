import { createSlice } from '@reduxjs/toolkit';
import { IFirstStep } from '../Content/FormPage/FormStep1/FormStep1';
import { ISecondStep } from '../Content/FormPage/FormStep2/FormStep2';
import { IThirdStep } from '../Content/FormPage/FormStep3/FormStep3';

interface IFormState {
    firstStep: IFirstStep,
    secondStep: ISecondStep,
    thirdStep: IThirdStep
}

const initialState: IFormState = {
    firstStep: {
        nickname: '', 
        name: '', 
        surname: '', 
        sex: ''
    },
    secondStep: {
        advantages: [], 
        checked: [], 
        picked: null 
    },
    thirdStep: {
        about: ''
    }
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFirstStep: (state, action) => {
            state.firstStep[action.payload.field] = action.payload.value;
        },
        updateSecondStep: (state, action) => {
            state.secondStep[action.payload.field] = action.payload.value;
        },
        updateThirdStep: (state, action) => {
            state.thirdStep[action.payload.field] = action.payload.value;
        },
        resetForm: state => {
            state.firstStep.nickname = '';
            state.firstStep.name = '';
            state.firstStep.surname = '';
            state.firstStep.sex = '';
            state.secondStep.advantages = [];
            state.secondStep.checked = [];
            state.secondStep.picked = null;
            state.thirdStep.about = '';
        },
    },
});

export const { 
    updateFirstStep, 
    updateSecondStep, 
    updateThirdStep, 
    resetForm 
} = formSlice.actions;

export default formSlice.reducer;

import React from 'react';
import './modal.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetForm } from '../../Store/formSlice.ts';

interface IModal {
    onClose: () => void
    isSuccess: boolean
}

export function Modal({ onClose, isSuccess }: IModal) {
    const node = document.querySelector('#modal_root');
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(resetForm());
    }

    if(!node) return null;

    return ReactDOM.createPortal ((
        <div className='overlay' onClick={onClose}>
            <div className='modal' onClick={e => e.stopPropagation()}>
                <h2 className='modal_title' >{ isSuccess ? 'Форма успешно отправлена' : 'Ошибка'}</h2>
                <div className={`modal_content ${isSuccess ? 'modal_success' : 'modal_failed'}`} ></div>

                {isSuccess
                    ? <Link 
                        id='button-to-main'
                        to='/'
                        type='button' 
                        className='btn modal_button' 
                        onClick={() => {
                            onClose();
                            handleChange();
                        }}
                    >
                        На главную
                    </Link>
                    : <button 
                        id='button-close'
                        type='button' 
                        className='btn modal_button' 
                        onClick={onClose}
                    >
                        Закрыть
                    </button>
                }
            </div>
        </div>
    ), node);
}



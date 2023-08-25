import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');

    const showToast = (type, message) => {
        setToastMessage(message);
        setToastType(type);
    };

    const hideToast = () => {
        setToastMessage('');
        setToastType('');
    };

    return (
        <ToastContext.Provider value={{ toastMessage, toastType, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
}
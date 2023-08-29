import React, { createContext, useContext, useState } from 'react';

const LoadingSpinnerContext = createContext();

export function useLoadingSpinner() {
    return useContext(LoadingSpinnerContext)
};

export function LoadingSpinnerProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    const show = () => {
        setIsLoading(true);
    };

    const hide = () => {
        setIsLoading(false);
    };

    return (
        <LoadingSpinnerContext.Provider value={{ isLoading, show, hide }}>
            {children}
        </LoadingSpinnerContext.Provider>
    );
};

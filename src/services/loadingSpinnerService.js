import { useLoadingSpinner } from '../contexts/LoadingSpinnerContext';

export const useLoadingSpinnerService = () => {
    const { show, hide } = useLoadingSpinner();

    const showSpinner = () => {
        show();
    };

    const hideSpinner = () => {
        hide();
    };

    return { showSpinner, hideSpinner };
};

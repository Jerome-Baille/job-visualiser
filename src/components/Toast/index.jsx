import React from 'react';
import { Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation, faRobot } from "@fortawesome/free-solid-svg-icons";
import { useToast } from '../../contexts/ToastContext';

export default function ToastComponent() {
    const { toastType, toastMessage, hideToast } = useToast();

    return (
        <div>
            {toastMessage && (
                <div className="overlay" onClick={hideToast}></div>
      )}
            <Toast
                onClose={hideToast}
                show={toastMessage !== ''}
                delay={3000}
                autohide
                className={`toast-${toastType}`}
                style={{ zIndex: 1000 }}
            >
                <Toast.Header className={`toast-header-${toastType}`}>
                    <strong className="me-auto d-flex justify-content-start align-items-center gap-2">
                        {toastType === 'success' && <FontAwesomeIcon icon={faCircleCheck} />}
                        {toastType === 'error' && <FontAwesomeIcon icon={faCircleExclamation} />}
                        {toastType === 'delete' && <FontAwesomeIcon icon={faRobot} />}
                        <span>
                            {toastType === 'delete'
                                ? 'Exterminate !'
                                : toastType === 'success'
                                    ? 'Success !'
                                    : 'Error !'}
                        </span>
                    </strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </div>
    );
}

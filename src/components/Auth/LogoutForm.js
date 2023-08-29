import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

/* Services */
import { useAuthService } from '../../services/authService';

/* Contexts */
import { useToast } from '../../contexts/ToastContext';

export default function LogoutForm({ handleUserChange, handleLoadedChange }) {
    const navigate = useNavigate()
    const { showToast } = useToast();
    const { logout } = useAuthService();

    const handleLogout = (event) => {
        event.preventDefault();

        handleLoadedChange(false);

        logout()
            .then(() => {
                handleLoadedChange(true);

                showToast(
                    'success',
                    'Farewell my friend!\nYou will be redirected to the Login page.'
                );

                handleUserChange({}, false);

                setTimeout(() => {
                    navigate('/auth');
                }, 2500);
            });
    };

    return (
        <section id="logout-form">
            <h1>Logout</h1>
            <p>Are you sure you want to log out ?</p>

            <Button variant="danger" onClick={handleLogout}>
                Logout
            </Button>
        </section>
    )
}

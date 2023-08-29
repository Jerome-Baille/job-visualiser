import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';

export default function RegisterForm({ toggleLoginRegister, handleUserChange, handleLoadedChange }) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { register } = useAuthService();

    const [userInfo, setUserInfo] = useState({});

    const handleChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    };

    const handleRegister = (event) => {
        event.preventDefault();
        var newUser = { ...userInfo };

        handleLoadedChange(false);

        register(newUser)
            .then((res) => {
                handleLoadedChange(true);
                if (res.status === 201) {
                    showToast('success', 'Your account has been successfully created !');

                    handleUserChange(newUser, true);

                    setTimeout(() => {
                        navigate('/');
                    }, 2500);
                } else {
                    showToast('error', res.body.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <section id="register-form" className="form-container">
            <h1>Register</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="btn-connexion"
                >
                    Submit
                </Button>
            </Form>

            <div className='alt-connexion'>
                <span>Already registered? </span>
                <button onClick={toggleLoginRegister} className='alt-link'>
                    Log in
                </button>
            </div>
        </section>
    );
}
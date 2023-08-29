import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';
import { setTokensAndUserId } from '../../utils/authUtils';

export default function LoginForm({ handleUserChange, handleLoadedChange, toggleLoginRegister }) {
    const navigate = useNavigate()
    const { showToast } = useToast();
    const { login } = useAuthService();

    const [userInfo, setUserInfo] = useState({})

    const handleChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        var user = { ...userInfo }

        handleLoadedChange(false);

        login(user)
            .then(res => {
                handleLoadedChange(true);
                if (res.status === 200) {
                    const { accessToken, refreshToken, userId, accessTokenExpiresIn, refreshTokenExpiresIn } = res.body;

                    setTokensAndUserId(accessToken, refreshToken, userId, accessTokenExpiresIn, refreshTokenExpiresIn);

                    localStorage.removeItem("jobs");

                    showToast('success', 'You are now logged in !');

                    handleUserChange(res.body, true);

                    setTimeout(() => {
                        navigate('/');
                    }, 2500)
                } else {
                    showToast('error', res.body.error)
                }
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <section id="login-form">
            <h1>Login</h1>
            <Form className="d-flex flex-column gap-3" onSubmit={handleLogin} validated>
                <div>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <Button
                    variant="primary"
                    type="submit"
                    className="btn-connexion"
                >
                    Login
                </Button>
            </Form>

            <div className='mt-5'>
                <span>Not registered? </span>
                <button onClick={toggleLoginRegister} className='alt-link'>
                    Create an account
                </button>
            </div>
        </section>
    )
}
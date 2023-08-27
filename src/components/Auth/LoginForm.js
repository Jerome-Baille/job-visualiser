import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';

export default function LoginForm({ handleUserChange, handleLoadedChange, toggleLoginRegister }) {
    const navigate = useNavigate()
    const { showToast } = useToast();

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
                    // Get the expiration time from the token
                    const accessTokenExpiresIn = new Date(new Date().getTime() + res.body.accessTokenExpiresIn * 1000);
                    const refreshTokenExpiresIn = new Date(new Date().getTime() + res.body.refreshTokenExpiresIn * 1000);

                    document.cookie = `accessToken=${res.body.accessToken}; expires=${accessTokenExpiresIn.toUTCString()}; path=/; sameSite=strict;`;
                    document.cookie = `refreshToken=${res.body.refreshToken}; expires=${refreshTokenExpiresIn.toUTCString()}; path=/; sameSite=strict;`;
                    document.cookie = `userId=${res.body.userId}; expires=${accessTokenExpiresIn.toUTCString()}; path=/; sameSite=strict;`;

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
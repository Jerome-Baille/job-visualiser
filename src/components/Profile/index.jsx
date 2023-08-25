import React, { useContext, useEffect, useState } from "react";
import { getProfile, deleteUser, logout, updateUser } from "../../services/authService";
import { AuthContext } from '../Layout';
import { useToast } from '../../contexts/ToastContext';

/* Bootstrap components */
import { Button, Card, Form, InputGroup, Modal, Stack } from "react-bootstrap";

/* FontAwesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const { showToast } = useToast();
    const [touched, setTouched] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible] = useState(false);
    const [profile, setProfile] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (!user.accessToken) return;
        getProfile(user.accessToken)
            .then(res => setProfile(res.body))
            .catch(err => console.log(err));
    }, [user.accessToken]);

    const handleDelete = async (event) => {
        event.preventDefault();

        handleClose();

        const res = await deleteUser(profile, user.accessToken);
        if (res.status === 200) {
            showToast('delete', 'Your profile has been annihilated from the database !')
        } else {
            showToast('error', 'Something went wrong, please try again !')
        }

        setTimeout(() => {
            logout();
            window.location.replace('/login');
        }, 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (profile.password !== confirmPassword) {
            showToast('error', 'Passwords do not match.');
            return;
        }

        updateUser(profile, user.accessToken)
            .then(res => {
                showToast('success', res.body.message);
            })
            .catch(err => {
                showToast('error', err.message);
                console.error(err);
            })
    };

    const handleInputChange = (e) => {
        setTouched(true); // set touched to true when input changes
        setProfile({ ...profile, [e.target.name]: e.target.value });

        // Get the span elements
        const passwordLength = document.getElementById('password-length');
        const passwordNumber = document.getElementById('password-number');
        const passwordLowercase = document.getElementById('password-lowercase');
        const passwordUppercase = document.getElementById('password-uppercase');
        const passwordSpecial = document.getElementById('password-special');

        // Check if the password meets the requirements and add/remove CSS classes accordingly
        if (e.target.name === 'password') {
            if (e.target.value.length >= 8) {
                passwordLength.classList.add('text-success');
            } else {
                passwordLength.classList.remove('text-success');
            }

            if (/\d/.test(e.target.value)) {
                passwordNumber.classList.add('text-success');
            } else {
                passwordNumber.classList.remove('text-success');
            }

            if (/[a-z]/.test(e.target.value)) {
                passwordLowercase.classList.add('text-success');
            } else {
                passwordLowercase.classList.remove('text-success');
            }

            if (/[A-Z]/.test(e.target.value)) {
                passwordUppercase.classList.add('text-success');
            } else {
                passwordUppercase.classList.remove('text-success');
            }

            if (/[^a-zA-Z0-9]/.test(e.target.value)) {
                passwordSpecial.classList.add('text-success');
            } else {
                passwordSpecial.classList.remove('text-success');
            }
        }
    }

    const handlePasswordVisibility = (id) => {
        const password = document.getElementById(id);
        password.type = password.type === 'password' ? 'text' : 'password';
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="background-container">
            <div className="main-container">
                <Card>
                    <Card.Body>
                        <Stack
                            gap={5} className="col-10 col-lg-5 mx-auto"
                            onSubmit={handleSubmit}
                            as={Form}
                        >
                            <div>
                                <Form.Group
                                    controlId="formUsername"
                                    className="mb-3"
                                >
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            name="username"
                                            value={profile.username}
                                            onChange={handleInputChange}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group
                                    controlId="formPassword"
                                    className="mb-3"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholder="Enter password"
                                            name="password"
                                            onChange={handleInputChange}
                                        />
                                        <Button
                                            id="button-password"
                                            className="btn-password"
                                            onClick={() => handlePasswordVisibility('formPassword')}
                                        >
                                            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                                        </Button>
                                    </InputGroup>
                                    <Form.Text className="text-muted">
                                        Must be minimum <span id="password-length">8 characters long</span> and includes at least <span id="password-number">one number</span>, <span id="password-lowercase">one lowercase</span>, <span id="password-uppercase">one uppercase</span> letter and a <span id="password-special">special character</span>.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholder="Confirm password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setTouched(true);
                                                setConfirmPassword(e.target.value);
                                            }}
                                        />
                                        <Button
                                            id="button-confirmPassword"
                                            className="btn-password"
                                            onClick={() => handlePasswordVisibility('formConfirmPassword')}
                                        >
                                            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                                        </Button>
                                    </InputGroup>
                                    {confirmPassword !== profile.password && touched && (
                                        <Form.Text className="text-danger">
                                            Passwords do not match.
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </div>

                            <div
                                className="d-flex justify-content-between"
                            >
                                <Button
                                    className="btn-delete"
                                    onClick={handleShow}
                                >
                                    Delete Account
                                </Button>

                                <Button
                                    className="btn-update"
                                    type="submit"
                                    disabled={!touched} // disable button if inputs are untouched
                                >
                                    Update
                                </Button>
                            </div>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Annihilation !</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete your account ?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Confirm
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Stack>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
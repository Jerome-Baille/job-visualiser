import React, { useContext, useEffect, useState } from "react";
import { getProfile, deleteUser, logout, updateUser } from "../../services/authService";
import { AuthContext } from '../Layout';

/* Bootstrap components */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';

/* FontAwesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation, faRobot } from "@fortawesome/free-solid-svg-icons";


export default function Profile() {
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showError, setShowError] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [profile, setProfile] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if(!user.accessToken) return;
        getProfile(user.accessToken)
            .then(res => setProfile(res.body))
            .catch(err => console.log(err));
    }, [user.accessToken]);

    const handleDelete = async (event) => {   
        event.preventDefault();

        handleClose();

        try{
            const res = await deleteUser(profile, user.token);
            res.status === 200 ? setShowDelete(true) : setShowError(true);
        } catch(err) {
            setShowError(true);
            console.error(err)
        } finally {
            setTimeout(() => {
                logout();
                // refresh page
                window.location.reload();
            }, 3000);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        updateUser(profile, user.token)
            .then(res => {
                setToastMessage(res.body.message);
                res.status === 200 ? setShowSuccess(true) : setShowError(true);
            })
            .catch(err => {
                setShowError(true);
                console.error(err);
            })
    };

    return (
        <div className="main-container">
            <div className="card-container">
                <Toast 
                    onClose={() => setShowSuccess(false)} 
                    show={showSuccess} 
                    delay={2500} 
                    autohide
                >
                    <Toast.Header className="toast-header--success">
                        <strong className="me-auto">
                            <FontAwesomeIcon icon={faCircleCheck} />
                            <span>  Success !</span>
                        </strong>
                        
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>

                <Toast 
                    onClose={() => setShowDelete(false)} 
                    show={showDelete} 
                    delay={3000} 
                    autohide
                >
                <Toast.Header className="toast-header--delete">
                    <strong className="me-auto">
                        <FontAwesomeIcon icon={faRobot} />
                        <span> Exterminate !</span>
                    </strong>
                    
                </Toast.Header>
                <Toast.Body>Your profile has been annihilated from the database !</Toast.Body>
                </Toast>

                <Toast 
                    onClose={() => setShowError(false)} 
                    show={showError} 
                    delay={3000} 
                    autohide
                >
                <Toast.Header className="toast-header--delete">
                    <strong className="me-auto">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        <span>  Error !</span>
                    </strong>
                    
                </Toast.Header>
                <Toast.Body>Something went wrong, please try again !</Toast.Body>
                </Toast>

                <h1>Profile</h1>
                <p>Update your profile</p>

                <Form
                    onSubmit={handleSubmit}
                >
                    <Form.Group 
                        controlId="formUsername"
                        className="mb-3" 
                    >
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={profile.username}
                            onChange={e => setProfile({ ...profile, username: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group 
                        controlId="formPassword"
                        className="mb-3" 
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={profile.password}
                            onChange={e => setProfile({ ...profile, password: e.target.value })}
                        />
                    </Form.Group>

                    <div
                        className="d-flex mt-5 mb-5 justify-content-center"
                    >
                        <Button 
                            className="mr-auto ml-auto"
                            variant="primary" 
                            type="submit"
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
                </Form>

                <Button
                    variant="danger"
                    className="mt-3 mb-3"
                    onClick={handleShow}
                >
                    Delete Account
                </Button>
            </div>
        </div>
    );
}
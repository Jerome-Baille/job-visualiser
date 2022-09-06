import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Toast from "react-bootstrap/Toast";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { register } from '../../services/auth';
import { Link } from 'react-router-dom';

function Register() {
  const [registerInfo, setRegisterInfo] = useState({})
  const [showSuccess, setShowSuccess] = useState(false);

const handleChange = (event) => {
  setRegisterInfo({ ...registerInfo, [event.target.name]: event.target.value });
}

const handleSubmit = (event) => {
  event.preventDefault();

  var newUser = {...registerInfo}

  register(newUser)
    .then(() => {
      console.log("success");
    }).catch(err => {
      console.log(err);
    }).finally(() => {
        setShowSuccess(true)

        setTimeout(() => {
            window.location.href = "/"
        }, 2500)
    })
}

  return (
    <div className="main-container">
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
          <Toast.Body>Your account has been successfully created !</Toast.Body>
      </Toast>
      <div className="connexion-container">
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
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
            <Link to="/login" className='alt-link'>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
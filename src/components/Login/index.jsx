import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Toast from "react-bootstrap/Toast";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../../services/auth';
import { Link } from 'react-router-dom';

function Login() {
  const [userInfo, setUserInfo] = useState({})
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

const handleChange = (event) => {
  setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
}

const handleSubmit = (event) => {
  event.preventDefault();

  var user = {...userInfo}

  login(user)
    .then(res => {
      if(res.status === 200) {
        document.cookie = `token=${res.body.token}`;
        document.cookie = `userId=${res.body.userId}`;

        setShowSuccess(true)

        setTimeout(() => {
            window.location.href = "/"
        }, 2500)
      } else {
        setShowError(true)
        setErrorMessage(res.body.error)
      }
    }).catch(err => {
      console.log(err);
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
          <Toast.Body>You are in !</Toast.Body>
      </Toast>

      <Toast 
          onClose={() => setShowError(false)} 
          show={showError} 
          delay={2500} 
          autohide
      >
          <Toast.Header className="toast-header--delete">
              <strong className="me-auto">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <span>  Error !</span>
              </strong>
              
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
      <div className="connexion-container">
        <div className="form-container">
          <Form onSubmit={handleSubmit} validated>
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
              Login
            </Button>
          </Form>

          <div className='alt-connexion'>
            <span>Not registered? </span> 
            <Link to="/register" className='alt-link'>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Layout';

/* Bootstrap elements */
import Toast from "react-bootstrap/Toast";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/* FontAwesome import */
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Services */
import { login, logout, register } from '../../services/auth';
import LoadingSpinner from '../LoadingSpinner';


export default function Auth() {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(true);
  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);

  const [registered, setRegistered] = useState(true);

  const [userInfo, setUserInfo] = useState({})

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  function toggleLoginRegister(){
    setRegistered(prevRegister => !prevRegister)
  }

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  }

  const handleLogout = (event) => {
    event.preventDefault();
    setIsLoaded(false);

    logout().then(() => {
        setIsLoaded(true);
        setToastMessage('Farewell my friend !\nYou will be redirected to the Login page.');
        setShowSuccess(true)

        setIsAuth(false);
        setUser({})

        setTimeout(() => {
            navigate('/auth');
        }, 2500)
    })
  }

  const handleLogin = (event) => {
    event.preventDefault();

    var user = {...userInfo}
    setIsLoaded(false);

    login(user)
      .then(res => {
        setIsLoaded(true);
        if(res.status === 200) {
          document.cookie = `token=${res.body.token};expires='2592000';path=/;`;
          document.cookie = `userId=${res.body.userId};expires='2592000';path=/;`;

          setToastMessage('You are now logged in !');
          setShowSuccess(true)

          setIsAuth(true);
          setUser(res.body)

          setTimeout(() => {
              navigate('/');
          }, 2500)
        } else {
          setToastMessage(res.body.error)
          setShowError(true)
        }
      }).catch(err => {
        console.log(err);
      })
  }

  const handleRegister = (event) => {
    event.preventDefault();
    setIsLoaded(false);
  
    var newUser = {...userInfo}
  
    register(newUser)
      .then(res => {
        setIsLoaded(true);
        if(res.status === 201) {
          setToastMessage('Your account has been successfully created !');
          setShowSuccess(true)
    
          setTimeout(() => {
            navigate('/');
          }, 2500)
        } else {
          setToastMessage(res.body.error)
          setShowError(true)
        }
      }).catch(err => {
        console.log(err);
      })
  }


  if(isLoaded){
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
            <Toast.Body>{toastMessage}</Toast.Body>
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
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
        <div className="connexion-container">
          
          {isAuth ? 
              <section id="logout-form">
                <h1>Logout</h1>
                <p>Are you sure you want to log out ?</p>

                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
              </section> 
          : (registered? 
              <section id="login-form" className="form-container">
                <h1>Login</h1>
                  <Form onSubmit={handleLogin} validated>
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
                    <button onClick={toggleLoginRegister} className='alt-link'>
                      Create an account
                    </button>
                  </div>
              </section> 
              : 
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
              )}
        </div>
      </div>
    );
  } else {
    return (
      <LoadingSpinner />
    )
  }
}
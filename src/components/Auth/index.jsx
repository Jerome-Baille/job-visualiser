import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Layout';

/* Bootstrap elements */
import { Button, Card, Form } from 'react-bootstrap';

/* Services */
import { login, logout, register } from '../../services/authService';
import LoadingSpinner from '../LoadingSpinner';

/* Contexts */
import { useToast } from '../../contexts/ToastContext';


export default function Auth() {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(true);
  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);

  const [registered, setRegistered] = useState(true);

  const [userInfo, setUserInfo] = useState({})

  const { showToast } = useToast();

  function toggleLoginRegister() {
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
      showToast('success', 'Farewell my friend !\nYou will be redirected to the Login page.');

      setIsAuth(false);
      setUser({})

      setTimeout(() => {
        navigate('/auth');
      }, 2500)
    })
  }

  // write a function that logs the user in
  function logUserIn(user) {
    login(user)
      .then(res => {
        setIsLoaded(true);
        if (res.status === 200) {
          // Get the expiration time from the token
          const accessTokenExpiresIn = new Date(new Date().getTime() + res.body.accessTokenExpiresIn * 1000);
          const refreshTokenExpiresIn = new Date(new Date().getTime() + res.body.refreshTokenExpiresIn * 1000);

          document.cookie = `accessToken=${res.body.accessToken}; expires=${accessTokenExpiresIn.toUTCString()}; path=/; sameSite=strict;`;
          document.cookie = `refreshToken=${res.body.refreshToken}; expires=${refreshTokenExpiresIn.toUTCString()}; path=/; sameSite=strict;`;
          document.cookie = `userId=${res.body.userId}; expires=${accessTokenExpiresIn.toUTCString()}; path=/; sameSite=strict;`;

          localStorage.removeItem("jobs");

          showToast('success', 'You are now logged in !');

          setIsAuth(true);
          setUser(res.body)

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

  const handleLogin = (event) => {
    event.preventDefault();

    var user = { ...userInfo }
    setIsLoaded(false);

    logUserIn(user)
  }

  const handleRegister = (event) => {
    event.preventDefault();
    setIsLoaded(false);
    var newUser = { ...userInfo }

    register(newUser)
      .then(res => {
        setIsLoaded(true);
        if (res.status === 201) {
          showToast('success', 'Your account has been successfully created !');

          setTimeout(() => {
            navigate('/');
          }, 2500)
        } else {
          showToast('error', res.body.error)
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        logUserIn(newUser)
      })
  }


  if (isLoaded) {
    return (
      <div className="background-container">
        <main className="main-container">
          <Card>
            <Card.Body>
              <div className="connexion-container">
                {isAuth ?
                  <section id="logout-form">
                    <h1>Logout</h1>
                    <p>Are you sure you want to log out ?</p>

                    <Button variant="danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </section>
                  : (registered ?
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
            </Card.Body>
          </Card>
        </main>
      </div>
    );
  } else {
    return (
      <LoadingSpinner />
    )
  }
}
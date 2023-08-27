import { useState, useContext } from 'react';
import { AuthContext } from '../Layout';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LogoutForm from './LogoutForm';

/* Bootstrap elements */
import { Card } from 'react-bootstrap';

/* Services */
import LoadingSpinner from '../LoadingSpinner';

export default function Auth() {
  const [isLoaded, setIsLoaded] = useState(true);
  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);

  const [registered, setRegistered] = useState(true);

  const handleUserChange = (newUser, authenticated) => {
    setUser(newUser);
    setIsAuth(authenticated);
  };

  const handleLoadedChange = (loaded) => {
    setIsLoaded(loaded);
  };

  const toggleLoginRegister = () => {
    setRegistered((prevRegister) => !prevRegister);
  };

  if (isLoaded) {
    return (
      <div className="background-container">
        <main className="main-container">
          <Card>
            <Card.Body>
              <div className="d-flex flex-column align-items-center justify-content-center">
                {isAuth ?
                  <LogoutForm
                    handleUserChange={handleUserChange}
                    handleLoadedChange={handleLoadedChange}
                  />
                  : (registered ?
                    <LoginForm
                      handleUserChange={handleUserChange}
                      handleLoadedChange={handleLoadedChange}
                      toggleLoginRegister={toggleLoginRegister}
                    />
                    :
                    <RegisterForm
                      handleUserChange={handleUserChange}
                      handleLoadedChange={handleLoadedChange}
                      toggleLoginRegister={toggleLoginRegister}
                    />
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
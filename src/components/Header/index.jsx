import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getTokenAndUserId } from '../../services/auth';

const Header = () => {
    const [userAuth, setUserAuth] = useState({});

    useEffect (() => {
        getTokenAndUserId().then(res => {
            setUserAuth(res);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <header className='header'>
            <Navbar bg="light" expand="md">
                <Container>
                    <NavLink to="/" className="navbar-brand" aria-label="Go to homepage">Job Visualiser</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <FontAwesomeIcon icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    {userAuth.userId !== '' ?
                        <NavLink 
                            to="/create" 
                            className="nav-link" 
                            aria-label="Manually add a job application"
                        >
                            Add a job application
                        </NavLink>
                        : null
                    }
                    {userAuth.userId !== '' ?
                        <NavLink 
                            to="/stats" 
                            className="nav-link" 
                            aria-label="Get all the statistics from your job applications"
                        >
                            Statistics
                        </NavLink>
                        : null
                    }
                    </Nav>

                    <Nav>
                        {userAuth.userId === '' ? 
                            <NavLink 
                                to="/login" 
                                className="nav-link" 
                                aria-label="Log into your account"
                            >
                                <div className="header-login">
                                    <FontAwesomeIcon icon={faRightToBracket} />
                                    <span>Login</span>
                                </div>
                            </NavLink>
                            :   <NavLink to="/logout" className="nav-link" aria-label="Log out of your account">
                                    <div className='header-login'>
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                        <span>Logout</span>
                                    </div>
                                </NavLink>
                        }

                        {userAuth.userId === '' ?
                            <NavLink to="/register" className="nav-link" aria-label="Create a new account">
                                <div className="header-login">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Register</span>
                                </div>
                            </NavLink>
                            : null
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
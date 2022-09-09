import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Layout';

/* Bootstrap components */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

/* FontAwesome imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
    const { isAuth } = useContext(AuthContext);

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
                        {isAuth ?
                            <>
                                <NavLink 
                                    to="/create" 
                                    className="nav-link" 
                                    aria-label="Manually add a job application"
                                >
                                    Add a job application
                                </NavLink>
                                <NavLink 
                                    to="/stats" 
                                    className="nav-link" 
                                    aria-label="Get all the statistics from your job applications"
                                >
                                    Statistics
                                </NavLink>
                                <NavLink 
                                    to="/job-boards" 
                                    className="nav-link" 
                                    aria-label="See the list of all your job boards"
                                >
                                    Job Boards
                                </NavLink>
                            </>
                            : null
                        }
                    </Nav>

                    <Nav>
                        <NavLink 
                            to="/auth" 
                            className="nav-link" 
                            aria-label={isAuth? "Log into your account" : "Log out of your account"}
                        >
                            <div className="header-login">
                                {!isAuth ?
                                    <>
                                        <FontAwesomeIcon icon={faRightToBracket} />
                                        <span>Login</span>
                                    </>
                                    :
                                    <>
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                        <span>Logout</span>
                                    </>
                                }
                            </div>
                        </NavLink>  
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
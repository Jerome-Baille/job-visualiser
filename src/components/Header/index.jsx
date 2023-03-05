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
            <Navbar bg="light" collapseOnSelect  expand="md">
                <Container>
                    <NavLink to="/" className="navbar-brand" aria-label="Go to homepage">Job Visualiser</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <FontAwesomeIcon icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isAuth ?
                            <>
                                <Nav.Link 
                                    eventKey={1}
                                    as={NavLink}
                                    to="/create" 
                                    className="nav-link" 
                                    aria-label="Manually add a job application"
                                >
                                    Add a job application
                                </Nav.Link>
                                <Nav.Link 
                                    eventKey={2}
                                    as={NavLink}
                                    to="/stats" 
                                    className="nav-link" 
                                    aria-label="Get all the statistics from your job applications"
                                >
                                    Statistics
                                </Nav.Link>
                                <Nav.Link 
                                    eventKey={3}
                                    as={NavLink}
                                    to="/job-boards" 
                                    className="nav-link" 
                                    aria-label="See the list of all your job boards"
                                >
                                    Job Boards
                                </Nav.Link>
                                <Nav.Link 
                                    eventKey={4}
                                    as={NavLink}
                                    to="/profile" 
                                    className="nav-link" 
                                    aria-label="See your profile"
                                >
                                    Profile
                                </Nav.Link>
                            </>
                            : null
                        }
                    </Nav>

                    <Nav>
                        <Nav.Link 
                            eventKey={4}
                            as={NavLink}
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
                        </Nav.Link>  
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
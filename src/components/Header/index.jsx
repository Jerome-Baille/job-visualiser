import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Layout';

import logo from '../../assets/img/job-visualizer-logo.png';

/* Bootstrap components */
import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';

/* FontAwesome imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCirclePlus, faRightFromBracket, faRightToBracket, faUser, faHandshake, faChartLine, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const { isAuth } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        const navLinks = document.querySelectorAll('.header .nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') !== `#${location.pathname}`) {
                link.classList.remove('active');
            }
        });
    }, [location]);

    return (
        <header className='header'>
            <Navbar bg="light" collapseOnSelect expand="md">
                <Container>
                    <NavLink to="/" className="navbar-brand" aria-label="Go to homepage">
                        <img src={logo} alt="Job Tracker logo" width={100} />
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <FontAwesomeIcon icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            {isAuth ?
                                <>
                                    <Nav.Link
                                        eventKey={1}
                                        as={NavLink}
                                        to="/create"
                                        exact="true"
                                        className="d-md-none"
                                        aria-label="Manually add a job application."
                                    >
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                        <span>Add a job application</span>
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey={2}
                                        as={NavLink}
                                        to="/stats"
                                        exact="true"
                                        className="d-md-none"
                                        aria-label="Get all the statistics from your job applications"
                                    >
                                        <FontAwesomeIcon icon={faChartLine} />
                                        Statistics
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey={3}
                                        as={NavLink}
                                        to="/job-boards"
                                        exact="true"
                                        className="d-md-none"
                                        aria-label="See the list of all your job boards"
                                    >
                                        <FontAwesomeIcon icon={faHandshake} />
                                        Job Boards
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey={4}
                                        as={NavLink}
                                        to="/how-to"
                                        exact="true"
                                        aria-label="Learn how to use the app."
                                    >
                                        <FontAwesomeIcon icon={faCircleQuestion} />
                                        How does it work?
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey={5}
                                        as={NavLink}
                                        to="/profile"
                                        exact="true"
                                        aria-label="See your profile"
                                    >
                                        <FontAwesomeIcon icon={faUser} />
                                        Profile
                                    </Nav.Link>
                                </>
                                : null
                            }
                            <Nav.Link
                                eventKey={6}
                                as={NavLink}
                                to="/auth"
                                exact="true"
                                className="btn-logout"
                                aria-label={isAuth ? "Log into your account" : "Log out of your account"}
                            >
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
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
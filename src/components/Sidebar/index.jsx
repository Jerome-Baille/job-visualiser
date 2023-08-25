import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Layout';

import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTachographDigital, faHandshake, faChevronLeft, faChevronRight, faList } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    const { isAuth } = useContext(AuthContext);
    const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
        const storedValue = localStorage.getItem('isSidebarClosed');
        return storedValue !== null ? JSON.parse(storedValue) : false;
    });
    const location = useLocation(); // Get the current route location

    useEffect(() => {
        localStorage.setItem('isSidebarClosed', JSON.stringify(isSidebarClosed));
    }, [isSidebarClosed]);

    useEffect(() => {
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') !== `#${location.pathname}`) {
                link.classList.remove('active');
            }
        });
    }, [location]);

    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
    };

    return (
        <>
            {isAuth ? (
                <Nav className={`d-none d-sm-flex flex-column sidebar ${isSidebarClosed ? 'closed' : ''}`}>
                    <Nav.Link className="sidebar-toggler px-0" onClick={toggleSidebar}>
                        {isSidebarClosed ? (
                            <FontAwesomeIcon icon={faChevronRight} />
                        ) : (
                            <FontAwesomeIcon icon={faChevronLeft} />
                        )}
                    </Nav.Link>

                    <Nav.Link
                        eventKey={1}
                        as={NavLink}
                        to="/dashboard"
                        exact="true"
                        aria-label="Get all the statistics from your job applications through the dashboard."
                    >
                        <FontAwesomeIcon icon={faTachographDigital} />
                        <span className={`sidebar-text ${isSidebarClosed ? 'hidden' : ''}`}>
                            Dashboard
                        </span>
                    </Nav.Link>

                    <Nav.Link
                        eventKey={2}
                        as={NavLink}
                        to="/list"
                        exact="true"
                        aria-label="Navigate to the home page. See all your job applications."
                    >
                        <FontAwesomeIcon icon={faList} />
                        <span className={`sidebar-text ${isSidebarClosed ? 'hidden' : ''}`}>
                            List of applications
                        </span>
                    </Nav.Link>

                    <Nav.Link
                        eventKey={3}
                        as={NavLink}
                        to="/create"
                        exact="true"
                        aria-label="Manually add a job application."
                    >
                        <FontAwesomeIcon icon={faCirclePlus} />
                        <span className={`sidebar-text ${isSidebarClosed ? 'hidden' : ''}`}>Add a job application</span>
                    </Nav.Link>

                    <Nav.Link
                        eventKey={4}
                        as={NavLink}
                        to="/job-boards"
                        exact="true"
                        aria-label="See the list of all your job boards"
                    >
                        <FontAwesomeIcon icon={faHandshake} />
                        <span className={`sidebar-text ${isSidebarClosed ? 'hidden' : ''}`}>
                            Job Boards
                        </span>
                    </Nav.Link>
                </Nav>

            ) : null}
        </>
    );
}
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../../Layout';
import { useToast } from '../../../contexts/ToastContext';

/* Bootstrap components */
import { Button, Card, InputGroup, Form, Modal, Stack } from 'react-bootstrap';

/* FontAwesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

/* Services */
import { useOpportunityService } from "../../../services/opportunityService";
import NotLogged from "../../NotLogged";
import { getTokenAndUserId } from "../../../utils/authUtils";
import { useAuthService } from '../../../services/authService';

// Base API URL
import { API_BASE_URL } from '../../../config/apiConfig';

export default function Detail() {
    const { getOneOpportunity, putOpportunity, deleteOpportunity } = useOpportunityService();
    const navigate = useNavigate()
    const { logout } = useAuthService();
    const { id } = useParams()
    const { isAuth, setIsAuth, setUser } = useContext(AuthContext);
    const decisionDateRef = useRef(null);
    const decisionRef = useRef(null);

    const [job, setJob] = useState({
        name: '',
        company: '',
        location: '',
        type: '',
        link: '',
        applicationDate: '',
        interviewDate: '',
        decisionDate: '',
        decision: ''
    })
    const [contactInfo, setContactInfo] = useState();

    const { showToast } = useToast();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const status = [
        {
            "label": "positive",
            "value": "positive"
        },
        {
            "label": "negative",
            "value": "negative"
        },
        {
            "label": "expired",
            "value": "expired"
        },
        {
            "label": "in progress",
            "value": "in progress"
        },
        {
            "label": "——",
            "value": "unknown"
        }
    ];

    const type = [
        {
            "label": "Remote",
            "value": "Remote"
        },
        {
            "label": "Hybrid",
            "value": "Hybrid"
        },
        {
            "label": "On Site",
            "value": "On Site"
        }
    ];

    useEffect(() => {
        if (!isAuth) {
            setJob([])
        }
        getOneOpportunity(id)
            .then(res => {
                if (res.status === 200) {
                    setJob(res.body)
                }
                if (res.status === 401) {
                    logout().then(() => {
                        setIsAuth(false);
                        setUser({})

                        setTimeout(() => {
                            navigate('/auth');
                        }, 2500)
                    })
                }
                if (res.status === 403) {
                    const checkAuthentication = async () => {
                        try {
                            const { accessToken, refreshToken, expirationDate } = await getTokenAndUserId();
                            if (!accessToken || new Date(expirationDate) < new Date()) {
                                // Access token is expired, try to get a new one using the refresh token
                                const response = await fetch(`${API_BASE_URL}/auth/refreshToken`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        refreshToken: refreshToken
                                    })
                                });
                                if (response.status === 200) {
                                    const { accessToken: newAccessToken, expirationDate: newExpirationDate } = await response.json();
                                    const accessTokenExpiresIn = new Date(new Date().getTime() + newExpirationDate * 1000);

                                    document.cookie = `accessToken=${newAccessToken}; expires=${accessTokenExpiresIn.toUTCString()}; path=/; sameSite=strict;`;

                                    setIsAuth(true);

                                    // Wait 2 seconds and reload the page
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000)
                                } else {
                                    setIsAuth(false);
                                }
                            } else {
                                const response = await fetch(`${API_BASE_URL}/auth/check`, {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${accessToken}`
                                    }
                                });
                                setIsAuth(response.status === 200);
                            }
                        } catch (error) {
                            console.log(error);
                            setIsAuth(false);;
                        }
                    };
                    checkAuthentication();
                }
            }).catch(err => {
                console.log(err)
            })
    }, [id, isAuth, setIsAuth, navigate, setUser])


    const handleSetToday = () => {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear().toString();
        const todayFormatted = `Refus le ${day}/${month}/${year}`;
        decisionDateRef.current.value = todayFormatted;
        decisionRef.current.value = "negative";
        setContactInfo({ ...contactInfo, decisionDate: todayFormatted, decision: "negative" });
    };

    const handleChange = (event) => {
        event.preventDefault();
        setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var opportunity = { ...job, ...contactInfo }

        putOpportunity(opportunity)
            .then(res => {
                if (res.status === 200) {
                    // In local storage, in "jobs", replace the old job with the new one
                    var jobs = JSON.parse(localStorage.getItem("jobs"));
                    var index = jobs.findIndex(job => job._id === id);
                    var opportunityLocalStorage = { ...opportunity }
                    jobs[index] = opportunityLocalStorage;
                    localStorage.setItem("jobs", JSON.stringify(jobs));

                    console.log("Candidacy has been updated")
                    showToast('success', "The job application has been successfully updated !");
                } else {
                    showToast('error', "Oh no, something went wrong ! Try again");
                }

            }).catch(err => {
                console.log(err)
            })
    };

    const handleDelete = (event) => {
        event.preventDefault();

        setShow(false)

        deleteOpportunity(id)
            .then(res => {
                if (res.status === 200) {
                    // In local storage, in "jobs", find the job with the id and delete it
                    var jobs = JSON.parse(localStorage.getItem("jobs"));
                    var index = jobs.findIndex(job => job._id === id);
                    jobs.splice(index, 1);
                    localStorage.setItem("jobs", JSON.stringify(jobs));

                    console.log("Candidacy has been deleted")

                    showToast('delete', "The job application has been deleted from the database !");

                    setTimeout(() => {
                        navigate('/');
                    }, 3000)

                } else {
                    showToast('error', "Oh no, something went wrong ! Try again");
                }
            }).catch(err => {
                console.log(err)
            })
    };

    return (
        <div className="background-container">
            <main className="main-container">
                <Card>
                    <Card.Body>
                        {isAuth ?
                            <div className="form-container">
                                <Stack
                                    className="col-10 col-lg-5 mx-auto"
                                    gap={3}
                                    onSubmit={handleSubmit}
                                    as={Form}
                                >
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Poste : </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Title of the job"
                                            defaultValue={job.name}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCompany">
                                        <Form.Label>Entreprise : </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="company"
                                            placeholder="Company name"
                                            defaultValue={job.company}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formLocation">
                                        <Form.Label>Lieu : </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="location"
                                            placeholder="Location"
                                            defaultValue={job.location}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formType">
                                        <Form.Label>Type de poste : </Form.Label>
                                        <Form.Select
                                            aria-label="Type of job"
                                            name="type"
                                            placeholder="Type of job"
                                            defaultValue={job.type}
                                            onChange={handleChange}
                                        >
                                            <option>{job.type}</option>

                                            {type.map((type) => {
                                                return (job.type === type.value ? null : <option key={type.value} value={type.value}>{type.label}</option>)
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formLink">
                                        <Form.Label>Lien de l'annonce ou site de l'entreprise : </Form.Label>
                                        <InputGroup className="mb-3">
                                            <Button
                                                className="btn-password"
                                                id="btn-link"
                                                onClick={() => window.open(job.link, '_blank')}
                                            >
                                                <FontAwesomeIcon icon={faLink} />
                                            </Button>
                                            <Form.Control
                                                type="text"
                                                name="link"
                                                placeholder="Link to the job offer or company website"
                                                defaultValue={job.link}
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formDate">
                                        <Form.Label>Date de candidature : </Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="applicationDate"
                                            placeholder={new Date(job.applicationDate).toLocaleDateString()}
                                            value={(contactInfo && contactInfo.applicationDate) ? new Date(contactInfo.applicationDate).toISOString().substring(0, 10) : job.applicationDate.substring(0, 10)}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formInterviewDate">
                                        <Form.Label>Date des entretiens : </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="interviewDate"
                                            placeholder="Interview date(s)"
                                            defaultValue={job.interviewDate}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formDecisionDate">
                                        <Form.Label>Acceptation / Refus : </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="decisionDate"
                                            placeholder="Decision date"
                                            defaultValue={job.decisionDate}
                                            onChange={handleChange}
                                            ref={decisionDateRef}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formDecision">
                                        <Form.Label>Résultat final de la candidature : </Form.Label>
                                        <Form.Select
                                            aria-label="Final decision on the candidacy"
                                            name="decision"
                                            placeholder="Final decision on the candidacy"
                                            defaultValue={job.decision}
                                            onChange={handleChange}
                                            ref={decisionRef}
                                        >
                                            <option>{job.decision === "unknown" ? "——" : job.decision}</option>

                                            {status.map((status) => {
                                                return (job.decision === status.value ? null : <option key={status.value} value={status.value}>{status.label}</option>)
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <section className="btn-container">
                                        <Button
                                            variant="danger"
                                            onClick={handleShow}
                                            className='btn-right btn-delete'
                                        >
                                            Delete
                                        </Button>

                                        <Button variant="secondary" onClick={handleSetToday}>
                                            Today
                                        </Button>

                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="btn-update"
                                        >
                                            Submit
                                        </Button>
                                    </section>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Annihilation !</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to delete this job application ?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="danger" onClick={handleDelete}>
                                                Confirm
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Stack>
                            </div>
                            : <NotLogged />}
                    </Card.Body>
                </Card>
            </main>
        </div>
    );
}
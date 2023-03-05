import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../../Layout';

/* Bootstrap components */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from "react-bootstrap/Toast";
import Modal from 'react-bootstrap/Modal';

/* FontAwesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation, faRobot } from "@fortawesome/free-solid-svg-icons";

/* Services */
import { deleteOpportunity, getOneOpportunity, putOpportunity } from "../../../services/opportunityService";
import LoadingSpinner from "../../LoadingSpinner";
import NotLogged from "../../NotLogged";
import { logout } from "../../../services/authService";


export default function Detail() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { isAuth, setIsAuth, user, setUser } = useContext(AuthContext);

    const [isLoaded, setIsLoaded] = useState(false);

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

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
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
        if(!user.token) return;
        if(!isAuth){
            setJob([])
        }
        getOneOpportunity(user.token, id)
            .then(res => {
                if(res.status === 200){
                setJob(res.body)
                setIsLoaded(true)
                }
                if(res.status === 401){
                    logout().then(() => {
                    setIsLoaded(true);            
                    setIsAuth(false);
                    setUser({})
            
                    setTimeout(() => {
                        navigate('/auth');
                    }, 2500)
                })}
            }).catch(err => {
                console.log(err)
            })
    }, [id, isAuth, setIsAuth, user.token, navigate, setUser])



  const handleChange = (event) => {
    event.preventDefault();
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var opportunity = {...job, ...contactInfo}

    putOpportunity(user.token, opportunity)
        .then(res => {
            if(res.status === 200){
                // In local storage, in "jobs", replace the old job with the new one
                var jobs = JSON.parse(localStorage.getItem("jobs"));
                var index = jobs.findIndex(job => job._id === id);
                var opportunityLocalStorage = {...opportunity}
                jobs[index] = opportunityLocalStorage;
                localStorage.setItem("jobs", JSON.stringify(jobs));

                console.log("Candidacy has been updated")   
                setShowSuccess(true)
            } else {
                setShowError(true)
            }

        }).catch(err => {
            console.log(err)
        })
  };

  const handleDelete = (event) => {
    event.preventDefault();

    setShow(false)

    deleteOpportunity(user.token, id)
        .then(res => {
            if(res.status === 200){
            // In local storage, in "jobs", find the job with the id and delete it
            var jobs = JSON.parse(localStorage.getItem("jobs"));
            var index = jobs.findIndex(job => job._id === id);
            jobs.splice(index, 1);
            localStorage.setItem("jobs", JSON.stringify(jobs));

            console.log("Candidacy has been deleted")

            setShowDelete(true)

            setTimeout(() => {
                navigate('/');
            }, 3000)

            } else {
                setShowError(true)
            }
        }).catch(err => {
            console.log(err)
        })
    };

if(isLoaded) {
  return (
    <div className="main-container">
        <div className={showSuccess? "latte" : null + showError? "latte" : null + showDelete? "latte" : null}></div>
        {isAuth?
        <div className="form-container">
            <Toast 
                onClose={() => setShowSuccess(false)} 
                show={showSuccess} 
                delay={3000} 
                autohide
            >
            <Toast.Header className="toast-header--success">
                <strong className="me-auto">
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <span>  Success !</span>
                </strong>
                
            </Toast.Header>
            <Toast.Body>Your job application has been successfully updated !</Toast.Body>
            </Toast>

            <Toast 
                onClose={() => setShowError(false)} 
                show={showError} 
                delay={3000} 
                autohide
            >
            <Toast.Header className="toast-header--delete">
                <strong className="me-auto">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <span>  Error !</span>
                </strong>
                
            </Toast.Header>
            <Toast.Body>Something went wrong, please try again !</Toast.Body>
            </Toast>

            <Toast 
                onClose={() => setShowDelete(false)} 
                show={showDelete} 
                delay={3000} 
                autohide
            >
            <Toast.Header className="toast-header--delete">
                <strong className="me-auto">
                    <FontAwesomeIcon icon={faRobot} />
                    <span> Exterminate !</span>
                </strong>
                
            </Toast.Header>
            <Toast.Body>The job application has been annihilated from the database !</Toast.Body>
            </Toast>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Poste : </Form.Label>
                <Form.Control 
                        type="text" 
                        name="name"
                        placeholder="Title of the job"
                        defaultValue={job.name}
                        onChange={handleChange} 
                    />
                {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text> */}
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
                        id="type"
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
                <Form.Control 
                        type="text"
                        name="link"
                        placeholder="Link to the job offer or company website"
                        defaultValue={job.link}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date de candidature : </Form.Label>
                <Form.Control 
                        type="date"
                        name="applicationDate"
                        placeholder={new Date(job.applicationDate).toLocaleDateString()}
                        value={(contactInfo && contactInfo.applicationDate)? new Date(contactInfo.applicationDate).toISOString().substring(0, 10) : new Date(job.applicationDate).toISOString().substring(0, 10)}
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
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDecision">
                <Form.Label>Résultat final de la candidature : </Form.Label>
                <Form.Select 
                        aria-label="Final decision on the candidacy"
                        id="decision"
                        name="decision"
                        placeholder="Final decision on the candidacy"
                        defaultValue={job.decision}
                        onChange={handleChange}
                    >
                        <option>{job.decision === "unknown" ? "——" : job.decision}</option>

                        {status.map((status) => {
                            return (job.decision === status.value ? null : <option key={status.value} value={status.value}>{status.label}</option>)
                        })}
                </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>

                <Button variant="danger" onClick={handleShow} className='btn-right'>
                    Delete
                </Button>

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
            </Form>
        </div>
        : <NotLogged />}
    </div>
  );
 } else {
    return (
        <LoadingSpinner />
    )
}
}
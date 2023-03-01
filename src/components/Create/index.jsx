import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Layout';

/* Bootstrap components */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from "react-bootstrap/Toast";

/* FontAwesome imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

/* Services */
import { postOpportunity } from "../../services/service";
import { getTokenAndUserId } from "../../services/auth";

/* Components import */
import NotLogged from "../NotLogged";


export default function Create() {
    const navigate = useNavigate()
    const { isAuth } = useContext(AuthContext);

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const [contactInfo, setContactInfo] = useState({
        type: "Remote",
        applicationDate: new Date().toISOString().substring(0, 10),
        decision: "unknown",
    });

    const type = ["Remote", "Hybrid", "On site"];
    const decision = ["positive", "negative", "in progress", "expired", "unknown"];

  const handleChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var applicationYear = contactInfo.applicationDate.substring(0, 4);
    applicationYear = +applicationYear;

    var date = new Date(contactInfo.applicationDate);
    var isoDate = date.toISOString();

    var opportunity = {...contactInfo, applicationDate: isoDate, applicationYear: applicationYear}

    getTokenAndUserId().then((res) => {
        setContactInfo({ ...contactInfo, userId: res.userId });

        opportunity = {...opportunity, userId: res.userId}

        var token = res.token;

        postOpportunity(token, opportunity)
        .then(res => {
            opportunity = {...opportunity, _id : res.body.id}

            if(res.status === 201) {
                var infoInLocalStorage = JSON.parse(localStorage.getItem("jobs"));
                if (infoInLocalStorage) {
                    infoInLocalStorage.unshift(opportunity);
                    localStorage.setItem("jobs", JSON.stringify(infoInLocalStorage));
                }

                setShowSuccess(true)

                setTimeout(() => {
                    navigate('/');
                }, 2500)
            } else {
                setShowError(true)
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
  };

  return (
    <>
    {isAuth ?
        <div className="main-container">
            <div className={showSuccess? "latte" : null + showError? "latte" : null}></div>
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
                <Toast.Body>The job application has been added to the database !</Toast.Body>
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
                <Toast.Body>Oh no, something went wrong ! <br/> Try again</Toast.Body>
            </Toast>
            <div className="form-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Title : (required)</Form.Label>
                    <Form.Control 
                            required
                            type="text" 
                            name="name"
                            placeholder="Title"
                            onChange={handleChange} 
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCompany">
                    <Form.Label>Company : (required)</Form.Label>
                    <Form.Control 
                            required
                            type="text"
                            name="company"
                            placeholder="Company"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label>Location : (required)</Form.Label>
                    <Form.Control 
                            required
                            type="text"
                            name="location"
                            placeholder="Location"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formType">
                    <Form.Label>Type of job : (required)</Form.Label>
                    <Form.Select
                        required
                        name="type"
                        placeholder="Type of job"
                        value={contactInfo.type}
                        onChange={handleChange}
                    >
                        {type.map((type, index) => {
                            return (<option key={index} value={type}>{type}</option>)
                        })}
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLink">
                    <Form.Label>Job offer link or company website : (required)</Form.Label>
                    <Form.Control 
                            required
                            type="text"
                            name="link"
                            placeholder="Job offer link or company website"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Date of application : (required)</Form.Label>
                    <Form.Control 
                            required
                            type="date"
                            name="applicationDate"
                            placeholder="Date of application"
                            value={contactInfo.applicationDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formInterviewDate">
                    <Form.Label>Date of interviews : </Form.Label>
                    <Form.Control 
                            type="text"
                            name="interviewDate"
                            placeholder="Date of interviews "
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDecisionDate">
                    <Form.Label>Acceptance / Refusal : </Form.Label>
                    <Form.Control 
                            type="text"
                            name="decisionDate"
                            placeholder="Acceptance / Refusal"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDecision">
                    <Form.Label>Final result of the application : </Form.Label>
                    <Form.Select
                        aria-label="Final decision on the application"
                        name="decision"
                        placeholder="Final result of the application"
                        value={contactInfo.decision}
                        onChange={handleChange}
                    >
                        {decision.map((decision, index) => {
                            return (<option key={index} value={decision}>{decision === 'unknown' ? "——" : decision}</option>)
                        })}
                    </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    : <NotLogged/>}
    </>
  );
}
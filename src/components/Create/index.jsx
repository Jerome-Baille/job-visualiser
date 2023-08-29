import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { useOpportunityService } from "../../services/opportunityService";
import { getTokenAndUserId } from "../../utils/authUtils";
import { useToast } from '../../contexts/ToastContext';

export default function Create() {
  const { postOpportunity } = useOpportunityService();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isValid, setIsValid] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    type: "Remote",
    applicationDate: new Date().toISOString().substring(0, 10),
    decision: "unknown",
  });

  const type = ["Remote", "Hybrid", "On site"];
  const decision = ["positive", "negative", "in progress", "expired", "unknown"];

  const handleChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
    setIsValid(event.target.form.checkValidity());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var applicationYear = contactInfo.applicationDate.substring(0, 4);
    applicationYear = +applicationYear;

    var date = new Date(contactInfo.applicationDate);
    var isoDate = date.toISOString();

    var opportunity = { ...contactInfo, applicationDate: isoDate, applicationYear: applicationYear }

    getTokenAndUserId().then((res) => {
      setContactInfo({ ...contactInfo, userId: res.userId });
      opportunity = { ...opportunity, userId: res.userId }

      postOpportunity(opportunity)
        .then(res => {
          opportunity = { ...opportunity, _id: res.body.id }

          if (res.status === 201) {
            var infoInLocalStorage = JSON.parse(localStorage.getItem("jobs"));
            if (infoInLocalStorage) {
              infoInLocalStorage.unshift(opportunity);
              localStorage.setItem("jobs", JSON.stringify(infoInLocalStorage));
            }

            showToast('success', "The job application has been added to the database !");
            setTimeout(() => {
              navigate('/');
            }, 2500)
          } else {
            showToast('error', "Oh no, something went wrong ! Try again");
          }
        })
        .catch(err => {
          showToast('error', "Oh no, something went wrong ! Try again");
          console.log(err);
        })
    })
  };

  return (
    <div className="background-container">
      <main className="main-container">
        <Card data-testid="create-element" className="main-container">
          <Card.Body>
            <Stack
              className="col-10 col-lg-5 mx-auto"
              gap={3}
              onSubmit={handleSubmit}
              as={Form}
            >
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
              <Button
                variant="primary"
                type="submit"
                className="btn-create"
                disabled={!isValid}
              >
                Submit
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      </main>
    </div>
  );
}
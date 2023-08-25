import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const InProgressJobs = ({ jobs }) => {
    const navigate = useNavigate();
    return (
        <div>
            <Card>
                <Card.Header>
                    <Card.Title>Job applications in progress ({jobs.filter(job => job.decision === 'in progress').length})</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.filter(job => job.decision === 'in progress').map(job => (
                                <tr key={`progress-${job._id}`} onClick={() => navigate(`/job/${job._id}`)}>
                                    <td>{job.name}</td>
                                    <td>{job.company}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default InProgressJobs;
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Layout';
import { getAllOpportunities } from '../../services/opportunityService';
import NotLogged from '../NotLogged';
import LoadingSpinner from '../LoadingSpinner';
import InProgressJobs from './InProgressJobs';
import Notes from '../Notes';
import { Card, Stack } from 'react-bootstrap';
import ChartContainer from './ChartContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleQuestion, faCircleXmark, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const { isAuth, user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                if (localStorage.getItem('jobs')) {
                    setJobs(JSON.parse(localStorage.getItem('jobs')));
                } else if (isAuth) {
                    getAllOpportunities(user.accessToken)
                        .then(data => {
                            if (data.status === 200) {
                                setJobs(data.body);
                                localStorage.setItem('jobs', JSON.stringify(data.body));
                            }
                        })
                } else {
                    setJobs([]);
                }
                setIsLoaded(true);
            } catch (error) {
                console.log(error);
                setIsLoaded(true);
            }
        };

        fetchJobs();
    }, [isAuth, user.accessToken]);

    if (!isLoaded) {
        return <LoadingSpinner />;
    }

    const positiveJobs = jobs.filter(job => job.decision === 'positive').length;
    const inProgressJobs = jobs.filter(job => job.decision === 'in progress').length;
    const unknownJobs = jobs.filter(job => job.decision === 'unknown' || job.decision === 'expired').length;
    const negativeJobs = jobs.filter(job => job.decision === 'negative').length;

    return (
        <div className="background-container">
            <main className="main-container">
                {isAuth ? (
                    <Stack gap={3}>
                        <div className="row">
                            <div className="col-sm-12 col-md-3">
                                <Card className="h-100">
                                    <Card.Body className='d-flex justify-content-between align-items-center positive-content'>
                                        <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                                        <div className='row d-flex justify-content-center text-center'>
                                            <Card.Title>Positive</Card.Title>
                                            <Card.Text>{positiveJobs}</Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-sm-12 col-md-3">
                                <Card className="h-100">
                                    <Card.Body className='d-flex justify-content-between align-items-center in-progress-content'>
                                        <FontAwesomeIcon icon={faHourglassHalf} size="xl" />
                                        <div className='row d-flex justify-content-center text-center'>
                                            <Card.Title>In Progress</Card.Title>
                                            <Card.Text>{inProgressJobs}</Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-sm-12 col-md-3">
                                <Card className="h-100">
                                    <Card.Body className='d-flex justify-content-between align-items-center'>
                                        <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
                                        <div className='row d-flex justify-content-center text-center'>
                                            <Card.Title>Unknown</Card.Title>
                                            <Card.Text>{unknownJobs}</Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-sm-12 col-md-3">
                                <Card className="h-100">
                                    <Card.Body className='d-flex justify-content-between align-items-center negative-content'>
                                        <FontAwesomeIcon icon={faCircleXmark} size="xl" />
                                        <div className='row d-flex justify-content-center text-center'>
                                            <Card.Title>Negative</Card.Title>
                                            <Card.Text>{negativeJobs}</Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <ChartContainer jobs={jobs} isLoaded={isLoaded} />
                        <div className="row">
                            <div className="col-sm-12 col-lg-4 mb-4">
                                <Notes/>
                            </div>
                            <div className="col-sm-12 col-lg-8">
                                <InProgressJobs jobs={jobs} />
                            </div>
                        </div>
                    </Stack>
                ) : (
                    <NotLogged />
                )}
            </main>
        </div>
    );
};

export default Dashboard;
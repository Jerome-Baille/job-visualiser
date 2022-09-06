import { useEffect, useState } from "react";
import { getAllOpportunities } from "../../services/service";
import Table from 'react-bootstrap/Table';
import { getTokenAndUserId } from "../../services/auth";

const Statistics = () => {
    const [jobs, setJobs] = useState([])
    const [userAuth, setUserAuth] = useState({});

    useEffect(() => {
        if (localStorage.getItem("jobs")) {
            var jobs = JSON.parse(localStorage.getItem("jobs"));
            setJobs(jobs);
        } else {
            getTokenAndUserId().then(res => {
                setUserAuth(res);

                if(res.userId !== ''){
                    getAllOpportunities(res.token).then(data => {
                    setJobs(data)

                    // add response to the localStorage
                    localStorage.setItem("jobs", JSON.stringify(data));
                    }).catch(err => {
                        console.log(err)
                    })
                } 
            }).catch(err => {
                console.log(err);
            })
        }
    } , [])

    function addRow() {    
        const currentDate = new Date();          
        var startingDate = new Date(2022, 4, 30);
        var endingDate = new Date(startingDate.getTime() + 6 * 24 * 60 * 60 * 1000);
        var result = [];
        var filterArray = [];
        var indexRow = 0

        while (startingDate < currentDate) {
            // eslint-disable-next-line
            var totalOfTheWeek = jobs.filter(job => {
                var applicationDate = new Date(job.applicationDate);
                var endingDatePlus = new Date(endingDate.getTime() + 23 * 59 * 60 * 1000);
                return (applicationDate >= startingDate) && (applicationDate <= endingDatePlus);
            });

            filterArray.push(totalOfTheWeek);

            var positiveOfTheWeek = totalOfTheWeek.filter(job => {
                return job.decision === "positive";
            }).length;

            var negativeOfTheWeek = totalOfTheWeek.filter(job => {
                return job.decision === "negative";
            }).length;

            var expiredOfTheWeek = totalOfTheWeek.filter(job => {
                return job.decision === "expired";
            }).length;

            var inProgressOfTheWeek = totalOfTheWeek.filter(job => {
                return job.decision === "in progress";
            }).length;

            var unknownOfTheWeek = totalOfTheWeek.filter(job => {
                return job.decision === "unknown";
            }).length;


            var newRow = <tr key={`row-${indexRow}`}><td>{startingDate.toLocaleDateString()} - {endingDate.toLocaleDateString()}</td><td>{totalOfTheWeek.length}</td><td className="bg-positive">{positiveOfTheWeek}</td><td className="bg-negative">{negativeOfTheWeek}</td><td className="bg-expired">{expiredOfTheWeek}</td><td className="bg-in-progress">{inProgressOfTheWeek}</td><td>{unknownOfTheWeek}</td></tr>

            result.push(newRow);

            startingDate = new Date(endingDate.getTime() + 1 * 24 * 60 * 60 * 1000);
            endingDate = new Date(startingDate.getTime() + 6 * 24 * 60 * 60 * 1000);
            indexRow++;
        }
        
        return result;
    }


    return(
        <>
        {userAuth.userId !== '' ? 
            <div className="main-container">
                <h1>Statistics</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Week</th>
                            <th>Total <br/> {jobs.length}</th>
                            <th className="bg-positive">Positive <br/>{jobs.filter(job => job.decision === "positive").length}</th>
                            <th className="bg-negative">Negative <br/> {jobs.filter(job => job.decision === "negative").length}</th>
                            <th className="bg-expired">Expired <br/> {jobs.filter(job => job.decision === "expired").length}</th>
                            <th className="bg-in-progress">In progress <br/> {jobs.filter(job => job.decision === "in progress").length}</th>
                            <th>Unknown <br/> {jobs.filter(job => job.decision === "unknown").length}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addRow()}
                    </tbody>
                </Table>
            </div> 
        :   <div className="main-container">
                <h1>You are not allowed to see this page</h1>
            </div>
        }
    </>
    )
}

export default Statistics;
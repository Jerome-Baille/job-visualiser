import React from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../Layout';
import { Chart } from "react-google-charts";

/* Bootstrap components */
import Table from 'react-bootstrap/Table';

/* Services */
import { getAllOpportunities } from "../../services/service";

/* Components import */
import NotLogged from "../NotLogged";
import LoadingSpinner from "../LoadingSpinner";
import AccordionStats from './AccordionStats';

const Statistics = () => {
    const [jobs, setJobs] = useState([])
    const { isAuth, user } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const [content, setContent] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("jobs")) {
            var jobs = JSON.parse(localStorage.getItem("jobs"));
            setJobs(jobs);
            setIsLoaded(true);
        } else {
            if(isAuth){
                getAllOpportunities(user.token).then(data => {
                setJobs(data)
                setIsLoaded(true);

                // add response to the localStorage
                localStorage.setItem("jobs", JSON.stringify(data));
                }).catch(err => {
                    console.log(err)
                })
            } else {
                setJobs([])
                setIsLoaded(true);
            }
        }

        addRow()
        // eslint-disable-next-line
    } , [isAuth, user.token])

    function countWeeks(){
        var today = new Date();
        var startingDate = new Date(2022, 4, 30)
        var diff = Math.abs(today - startingDate);
        var diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        var diffWeeks = Math.ceil(diffDays / 7);

        return diffWeeks;
    }

    function addRow() {    
        const currentDate = new Date();          
        // var startingDate = new Date(2022, 4, 30);
        var startingDate = new Date(2022, 5, 1);
        // var endingDate = new Date(startingDate.getTime() + 6 * 24 * 60 * 60 * 1000);
        var result = [];
        var filterArray = [];
        var indexRow = 0

        while(startingDate.getMonth() + 1 <= currentDate.getMonth() +1){
            let month   = startingDate.getMonth() + 1;
            let year    = startingDate.getFullYear();

            // filter the jobs to only return the ones that correspond to month and year
            filterArray = jobs.filter(job => {
                var jobDate = new Date(job.applicationDate);
                return jobDate.getMonth() + 1 === month && jobDate.getFullYear() === year;
            })

            var positive = filterArray.filter(job => {
                return job.decision === "positive";
            }).length;

            var negative = filterArray.filter(job => {
                return job.decision === "negative";
            }).length;

            var expired = filterArray.filter(job => {
                return job.decision === "expired";
            }).length;

            var inProgress = filterArray.filter(job => {
                return job.decision === "in progress";
            }).length;

            var unknown = filterArray.filter(job => {
                return job.decision === "unknown";
            }).length;

            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            var addedRow = {
                "index": indexRow,
                "month": month,
                "monthName": months[month-1],
                "year": year,
                "total": filterArray.length,
                "positive": positive,
                "negative": negative,
                "expired": expired,
                "inProgress": inProgress,
                "unknown": unknown
            }

            // add the row to the result array
            result.push(addedRow)

            // add a month to the starting date
            startingDate.setMonth(startingDate.getMonth() + 1);
        }

        setContent(result);
    }

    if(isLoaded){
        return(
            <div className="main-container">
                {isAuth ? 
                <>
                    <h1>Statistics</h1>

                    <p>
                        You have been looking for a job for <strong>{countWeeks()} weeks.</strong><br/>
                        So far, you have applied for <strong>{jobs.length} jobs.</strong> (around {Math.round(jobs.length/countWeeks())} per week)<br/>
                    </p>

                    <Chart
                        chartType="PieChart"
                        data={[
                            ["Task", "Hours per Day"],
                            [`Positive (${jobs.filter(job => job.decision === 'positive').length})`, jobs.filter(job => job.decision === "positive").length],
                            [`Negative (${jobs.filter(job => job.decision === "negative").length})`, jobs.filter(job => job.decision === "negative").length],
                            [`Expired (${jobs.filter(job => job.decision === "expired").length})`, jobs.filter(job => job.decision === "expired").length],
                            [`In Progress (${jobs.filter(job => job.decision === "in progress").length})`, jobs.filter(job => job.decision === "in progress").length],
                            [`Unknown (${jobs.filter(job => job.decision === "unknown").length})`, jobs.filter(job => job.decision === "unknown").length],
                            ]}
                        options={{
                            title: `My Job Applications (${jobs.length})`,
                            colors: ['#42b883', '#a6120d', '#878681', '#264de4', '#CBC3E3']
                            }}
                        width={"100%"}
                        height={"500px"}
                    />

                <Table striped bordered hover size="sm" className="table-stats">
                    <thead>
                        <tr>
                            <th className="bg-positive">
                                Positive <br/>{jobs.filter(job => job.decision === "positive").length}
                            </th>
                            <th className="bg-negative">
                                Negative <br/> {jobs.filter(job => job.decision === "negative").length}
                            </th>
                            <th className="bg-expired">
                                Expired <br/> {jobs.filter(job => job.decision === "expired").length}
                            </th>
                            <th className="bg-in-progress">
                                In progress <br/> {jobs.filter(job => job.decision === "in progress").length}
                            </th>
                            <th>
                                Unknown <br/> {jobs.filter(job => job.decision === "unknown").length}
                            </th>
                        </tr>
                    </thead>
                    
                        {content.length!==0 ? content.map((row, index) => (
                            <tbody key={`row-${index}`}>
                                <tr>
                                    <td colSpan="5">
                                        <AccordionStats row={row} jobs={jobs} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bg-positive">
                                        {row.positive}
                                    </td>
                                    <td className="bg-negative">
                                        {row.negative}
                                    </td>
                                    <td className="bg-expired">
                                        {row.expired}
                                    </td>
                                    <td className="bg-in-progress">
                                        {row.inProgress}
                                    </td>
                                    <td>
                                        {row.unknown}
                                    </td>
                                </tr>
                            </tbody>
                        )) : null }
                    
                </Table>
                </>
                : <NotLogged/>}
            </div> 
        )
    } else {
        return (
            <LoadingSpinner />
        )
    }
}

export default Statistics;
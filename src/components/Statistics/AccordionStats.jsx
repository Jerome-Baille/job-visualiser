import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const AccordionStats = ({row, jobs}) => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        addRow()
        // eslint-disable-next-line
    } , [])

    function addRow() {    
        var date = new Date(2022, 0, 1);
        date.setMonth(row.month -1);
        date.setFullYear(row.year);

        var endingDate = new Date(date);
        endingDate.setDate(31);

        var startDate = new Date(date);

        var result = []

        var jobsOfTheMonth = jobs.filter(job => {
            var jobDate = new Date(job.applicationDate);
            return jobDate >= date && jobDate <= endingDate;
        })

        while(startDate <= endingDate && startDate <= new Date()){
            var begin = moment(startDate).startOf('isoWeek');
            var end = moment(startDate).endOf('isoWeek');

            // eslint-disable-next-line
            var jobsPerWeek = jobsOfTheMonth.filter(job => {
                var jobDate = new Date(job.applicationDate);
                return (jobDate >= (begin>=date?begin:date)) && (jobDate <= (end<=endingDate?end:endingDate));
            })

            var positiveOfTheWeek = jobsPerWeek.filter(job => {
                return job.decision === "positive";
            }).length;

            var negativeOfTheWeek = jobsPerWeek.filter(job => {
                return job.decision === "negative";
            }).length;

            var expiredOfTheWeek = jobsPerWeek.filter(job => {
                return job.decision === "expired";
            }).length;

            var inProgressOfTheWeek = jobsPerWeek.filter(job => {
                return job.decision === "in progress";
            }).length;

            var unknownOfTheWeek = jobsPerWeek.filter(job => {
                return job.decision === "unknown";
            }).length;

            var firstDay = begin>=date? begin.format('DD/MM/YYYY') : date.toLocaleDateString();
            var lastDay = end<=endingDate? end.format('DD/MM/YYYY') : endingDate.toLocaleDateString();

            var day = {
                begin: firstDay,
                end: lastDay,
                total: jobsPerWeek.length,
                positive: positiveOfTheWeek,
                negative: negativeOfTheWeek,
                expired: expiredOfTheWeek,
                inProgress: inProgressOfTheWeek,
                unknown: unknownOfTheWeek,
                data: jobsOfTheMonth.length
            }
           
           result.push(day)
            
           startDate.setDate(startDate.getDate() + 7);
        }

        setContent(result);
    }

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    {row.monthName}
                    <br/>Total of the month: {row.total}
                </Accordion.Header>
                <Accordion.Body>
                    {content.map((key, index) => (
                        <Table key={index} striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <td colSpan={5}>
                                        {key.begin} to {key.end}
                                        <br/>Total of the week: {key.total}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="bg-positive">Positive: {key.positive}</td>
                                    <td className="bg-negative">Negative: {key.negative}</td>
                                    <td className="bg-expired">Expired: {key.expired}</td>
                                    <td className="bg-in-progress">In progress: {key.inProgress}</td>
                                    <td className="bg-unknown">Unknown: {key.unknown}</td>
                                </tr>
                            </tbody>
                        </Table>
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionStats
import { useContext, useRef, useState } from "react";

/* Bootstrap components */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

/* Context */
import { JobContext } from './Table';

function TableFilter() {
    const searchInputRef = useRef(null);
    const [filterForm, setFilterForm] = useState({
        typeFilter: "",
        decisionFilter: ""
    });
    const { jobs, setJobFiltered } = useContext(JobContext);

    function handleChange(event) {
        setFilterForm(prevFilterForm => ({
            ...prevFilterForm,
            [event.target.name]: event.target.value
        }));

        const obj = { ...filterForm, [event.target.name]: event.target.value }

        const filtered = [...jobs].filter(job => {
            if (obj.typeFilter && !obj.decisionFilter) {
                return (obj.typeFilter !== "all") ? job.type.toLowerCase().includes(obj.typeFilter.toLowerCase()) : /remote|hybrid|on site/.test(job.type.toLowerCase());
            }
            if (obj.decisionFilter && !obj.typeFilter) {
                return (obj.decisionFilter !== "all") ? job.decision.toLowerCase().includes(obj.decisionFilter.toLowerCase()) : /positive|negative|expired|in progress|unknown/.test(job.decision.toLowerCase());
            }
            if (obj.typeFilter && obj.decisionFilter) {
                if (obj.decisionFilter === "all") {
                    return job.type.toLowerCase().includes(obj.typeFilter.toLowerCase()) && /positive|negative|expired|in progress|unknown/.test(job.decision.toLowerCase())
                } else if (obj.typeFilter === "all") {
                    return job.decision.toLowerCase().includes(obj.decisionFilter.toLowerCase()) && /remote|hybrid|on site/.test(job.type.toLowerCase())
                } else {
                    return job.type.toLowerCase().includes(obj.typeFilter.toLowerCase()) && job.decision.toLowerCase().includes(obj.decisionFilter.toLowerCase())
                }
            }

            return null
        })

        setJobFiltered(filtered)

        if ((!obj.typeFilter && !obj.decisionFilter) || (obj.typeFilter === "all" && obj.decisionFilter === "all")) {
            // setJobFiltered(jobs)
            const filtered = [...jobs].filter(job => {
                return /positive|negative|expired|in progress|unknown/.test(job.decision.toLowerCase()) && /remote|hybrid|on site/.test(job.type.toLowerCase());
            })

            setJobFiltered(filtered)
        }
    }

    function handleClick() {
        setFilterForm({ ...filterForm, typeFilter: "", decisionFilter: "" });
        document.getElementById("typeFilter").selectedIndex = 0;
        document.getElementById("decisionFilter").selectedIndex = 0;
        searchInputRef.current.value = "";
        setJobFiltered(jobs)
    }

    function handleSearch() {
        const searchTerm = searchInputRef.current.value; // get the search keyword from the input field
        const jobs = JSON.parse(localStorage.getItem('jobs')) || []; // parse the "jobs" item from localStorage
        const filteredJobs = jobs.filter((job) => {
            const jobName = job.name.toLowerCase(); // convert the job name to lowercase
            const jobCompany = job.company.toLowerCase(); // convert the job company to lowercase
            const searchTermLower = searchTerm.toLowerCase(); // convert the search keyword to lowercase
            return jobName.includes(searchTermLower) || jobCompany.includes(searchTermLower); // check if the job name or company includes the search keyword
        });
        setJobFiltered(filteredJobs);
    }


    return (
        <Accordion flush className="mb-3">
            <Accordion.Item eventKey="3">
                <Accordion.Header>Search & Filter</Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit={handleSearch}>
                        <Form.Group className="mb-3" controlId="formSearch">
                            <Form.Label>
                                Search
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter job title or company name"
                                name="search"
                                onChange={handleSearch}
                                ref={searchInputRef}
                            />
                        </Form.Group>
                    </Form>

                    <div className="filter-container">
                        <Form.Select
                            aria-label="Filter by type"
                            id="typeFilter"
                            name="typeFilter"
                            onChange={handleChange}
                        >
                            <option>Filter by type</option>
                            <option value="all">All</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="on Site">On site</option>
                        </Form.Select>

                        <Form.Select
                            aria-label="Filter by status"
                            id="decisionFilter"
                            name="decisionFilter"
                            onChange={handleChange}
                        >
                            <option>Filter by status</option>
                            <option value="all">All</option>
                            <option value="negative">negative</option>
                            <option value="positive">positive</option>
                            <option value="expired">expired</option>
                            <option value="in progress">in progress</option>
                            <option value="unknown">unknown</option>
                        </Form.Select>
                        <Button
                            variant="secondary"
                            onClick={handleClick}
                        >
                            Reset
                        </Button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TableFilter;
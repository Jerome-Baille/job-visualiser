import { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useWindowSize from "../useWindowSize";
import { getAllOpportunities } from "../../services/service";
import { getTokenAndUserId } from "../../services/auth";

const Table = () => {
    const windowSize = useWindowSize();
    const [jobs, setJobs] = useState([])
    const [jobFiltered, setJobFiltered] = useState([])
    const [filterForm, setFilterForm] = useState({
      typeFilter: "",
      decisionFilter: ""
  });

    useEffect(() => {
        if (localStorage.getItem("jobs")) {
          var jobs = JSON.parse(localStorage.getItem("jobs"));
          setJobs(jobs);
          setJobFiltered(jobs)
        } else {
          getTokenAndUserId().then(res => {
            if(res.userId !== ''){
              getAllOpportunities(res.token).then(data => {
                setJobs(data)
                setJobFiltered(data)
  
                // add response to the localStorage
                localStorage.setItem("jobs", JSON.stringify(data));
              }).catch(err => {
                  console.log(err)
              })
            } else {
              // if user is not logged in, redirect to Login
              window.location.href = "#/login"
            }
          }).catch(err => {
            console.log(err);
          })
        }
    }, [])


    var columns = [];

    if(windowSize.width > 768) {
      columns = [
      { label: "Title", accessor: "name", sortable: true },
      { label: "Company", accessor: "company", sortable: true },
      { label: "Location", accessor: "location", sortable: true },
      { label: "Type of job", accessor: "type", sortable: false },
      { label: "Job offer link or company website", accessor: "link", sortable: false },
      { label: "Date of application", accessor: "applicationDate", sortable: true },
      { label: "Final result of the application", accessor: "decision", sortable: false },
      ];
    } else {
      columns = [
      { label: "Title", accessor: "name", sortable: true },
      { label: "Company", accessor: "company", sortable: true },
      { label: "Type of job", accessor: "type", sortable: false },
      { label: "Job offer link or company website", accessor: "link", sortable: false },
      ];
    }

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...jobFiltered].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;

                return (
                a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                numeric: true,
                }) * (sortOrder === "asc" ? 1 : -1)
                );
            });

            jobFiltered === jobs ? setJobs(sorted) : setJobFiltered(sorted);
        }
    };

    function handleChange(event) {
        setFilterForm({ ...filterForm, [event.target.name]: event.target.value });

        var obj = {...filterForm, [event.target.name]: event.target.value }

        const filtered = [...jobs].filter(job => {
            if(obj.typeFilter && !obj.decisionFilter){
                return (obj.typeFilter !== "all") ? job.type.toLowerCase().includes(obj.typeFilter.toLowerCase()) : /remote|hybrid|on site/.test(job.type.toLowerCase());
            }
            if(obj.decisionFilter && !obj.typeFilter){
                return (obj.decisionFilter !== "all") ? job.decision.toLowerCase().includes(obj.decisionFilter.toLowerCase()) : /positive|negative|expired|in progress|unknown/.test(job.decision.toLowerCase());
            }
            if(obj.typeFilter && obj.decisionFilter){
              if(obj.decisionFilter === "all") {
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

        if((!obj.typeFilter && !obj.decisionFilter) || (obj.typeFilter === "all" && obj.decisionFilter === "all")) {
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
        setJobFiltered(jobs)
    }

    // function loadMore() {
    //     var offset = jobs.length + 1;

    //     const urls = [
    //         "https://jb-jat.herokuapp.com/api/?limit=10&offset=" + offset
    //       ];

    //       const getData = async () => {
    //         const [newJobs] = await Promise.all(
    //           urls.map((url) => fetch(url)
    //             .then((res) => res.json()))
    //         );

    //         if(newJobs.length<10){
    //             seeMore = false;

    //             const loadBtn = document.getElementById("loadMore")
    //             loadBtn.style.display = "none";
    //         } else {
    //             seeMore = true;
    //             setJobs([...jobs, ...newJobs]);
    //             setJobFiltered([...jobs, ...newJobs]);

    //             let tall = newJobs.length
    //             console.log({seeMore, tall})
    //         }      
    //       };

    //       getData();
    // }


 return (
  <>
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
    <table className="table">
    { jobFiltered.length === 0 ? <tbody><tr><td className="no-data" colSpan={7}>There is no data available</td></tr></tbody> : null }
    <caption>
     {/* Job offers I applied, column headers are sortable. */}
      {jobFiltered.length} results out of {jobs.length} job applications
    </caption>
    <TableHead columns={columns} handleSorting={handleSorting} />
    {/* <TableHead {...{ columns, handleSorting }} /> */}
    <TableBody columns={columns} jobs={jobFiltered === jobs ? jobs : jobFiltered} />
   </table>
   {/* <div className="see-more">
      <Button variant="outline-primary" id="loadMore" size="sm" onClick={loadMore}>Load more</Button>
   </div> */}
  </>
 );
};

export default Table;
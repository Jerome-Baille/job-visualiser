import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Layout';

/* Components import */
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableFilter from "./TableFilter";
import useWindowSize from "../useWindowSize";

/* Services */
import { getAllOpportunities } from "../../services/opportunityService";
import LoadingSpinner from "../LoadingSpinner";
import PaginationSystem from "./PaginationSystem";
import { logout } from "../../services/authService";


const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const windowSize = useWindowSize();
  const navigate = useNavigate()
  const { isAuth, setIsAuth, user, setUser } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const [jobs, setJobs] = useState([])
  const [jobFiltered, setJobFiltered] = useState([])

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const slicedJobs = jobs.slice(indexOfFirstRecord, indexOfLastRecord);
  const slicedJobFiltered = jobFiltered.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = useMemo(() => {
    const pageCount = Math.ceil((jobFiltered ? jobFiltered.length : jobs.length) / recordsPerPage);
    return pageCount;
  }, [jobFiltered, jobs, recordsPerPage])

    useEffect(() => {
        if (localStorage.getItem("jobs")) {
          const jobsInLocalStorage = JSON.parse(localStorage.getItem("jobs"));
          setJobs(jobsInLocalStorage);
          setJobFiltered(jobsInLocalStorage)
          setIsLoaded(true);
        } else {
          if(isAuth){
            getAllOpportunities(user.accessToken)
              .then(data => {

                if(data.status === 200){
                setJobs(data.body)
                setJobFiltered(data.body)
                setIsLoaded(true);

                // add response to the localStorage
                localStorage.setItem("jobs", JSON.stringify(data.body));
                }

                if(data.status === 401){
                  logout().then(() => {
                    setIsLoaded(true);            
                    setIsAuth(false);
                    setUser({})
            
                    setTimeout(() => {
                        navigate('/auth');
                    }, 2500)
                })
                }
              }).catch(err => {
                  console.log(err)
              })
          }
        }
    }, [isAuth, navigate, user.accessToken, setUser, setIsAuth])

    let columns = [];

    if(windowSize.width > 768) {
      columns = [
      { label: "Job position", accessor: "name", sortable: true },
      { label: "Company", accessor: "company", sortable: true },
      // { label: "Location", accessor: "location", sortable: true },
      { label: "Type", accessor: "type", sortable: false },
      // { label: "Job offer link or company website", accessor: "link", sortable: false },
      { label: "Date", accessor: "applicationDate", sortable: true },
      { label: "Decision", accessor: "decision", sortable: false },
      ];
    } else {
      columns = [
      { label: "Title", accessor: "name", sortable: true },
      { label: "Company", accessor: "company", sortable: true },
      { label: "Type", accessor: "type", sortable: false },
      { label: "Link", accessor: "link", sortable: false },
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


  if(isLoaded){
    return (
      <>
        <JobContext.Provider value={{ jobs, setJobs, jobFiltered, setJobFiltered }}>
            <TableFilter />
        </JobContext.Provider>
        
        <table className="table table-main">
          { jobFiltered.length === 0 ? <tbody><tr><td className="no-data" colSpan={7}>There is no data available</td></tr></tbody> : null }
          <caption>
          {/* Job offers I applied, column headers are sortable. */}
            {jobFiltered.length} results out of {jobs.length} job applications
          </caption>
          <TableHead columns={columns} handleSorting={handleSorting} />
          <TableBody columns={columns} jobs={jobFiltered === jobs ? slicedJobs : slicedJobFiltered} />
        </table>

        <PaginationSystem
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
      </>
    );
  } else {
    return(
      <LoadingSpinner />
    )
  }
};

export default Table;

export const JobContext = React.createContext();
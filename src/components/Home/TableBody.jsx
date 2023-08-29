import { useNavigate } from 'react-router-dom';

/* Bootstrap components */
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

/* FontAwesome import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from "@fortawesome/free-solid-svg-icons";

/* Services */
import { useOpportunityService } from "../../services/opportunityService";


const TableBody = ({ jobs, columns }) => {
    const { putOpportunity } = useOpportunityService();
    const navigate = useNavigate();

    const status = [
        {
            "label": "positive",
            "value": "positive"
        },
        {
            "label": "negative",
            "value": "negative"
        },
        {
            "label": "expired",
            "value": "expired"
        },
        {
            "label": "in progress",
            "value": "in progress"
        },
        {
            "label": "——",
            "value": "unkwnown"
        }
    ];

      const mouseDownHandler = ( accessor, tData, data, event ) => {
        if( event.button === 0 || event.button === 1 ) {
            if(accessor !== 'decision') {
                if( accessor === 'link' ) {
                    window.open(tData, '_blank')
                } else {
                    navigate(`/job/${data._id}`)
                }
            }
        }
      }

      const handleChange = (data, event) => {
        const opportunity = {...data, decision: event.target.value};

        putOpportunity(opportunity)
            .then((res) => {
                if(res.status === 200) {
                    // in localstorage, find the key jobs, inside this key find the index of the job with id = data._id, and update the decision to event.target.value
                    let jobs = JSON.parse(localStorage.getItem('jobs'));
                    let index = jobs.findIndex(job => job._id === opportunity._id);
                    jobs[index].decision = event.target.value;
                    localStorage.setItem('jobs', JSON.stringify(jobs));

                    window.location.reload();
                } else {
                    console.log(res.body.error)
                }
            }).catch(err => {
                console.log(err)
            })
      }

      const renderTooltip = (tData, data, props) => (
        <Tooltip id={`tooltip-${data._id}`} {...props}>
          {tData}
        </Tooltip>
      );

      function tdFiller(accessor, tData, data) {
        if (accessor === 'link') {
            return     <OverlayTrigger
                            placement="left"
                            delay={{ show: 150, hide: 300 }}
                            overlay={(props) => renderTooltip(tData, data, props)}
                        >
                            <button className='link-btn'>
                                <FontAwesomeIcon icon={faLink} />
                            </button>
                        </OverlayTrigger>

        } 
        if(accessor === 'applicationDate'){
            return new Date(tData).toLocaleDateString();
        }

        if(accessor === 'decision') {
            // Add the unique identifier to the input element's "id" attribute
            const inputId = `decision-${data._id}`;

            return (
                <Form.Select 
                    aria-label="Final decision on the candidacy"
                    id={inputId}
                    name="decision"
                    size="sm"
                    className="decision-select"
                    onChange={(event) => handleChange(data, event)}
                >
                    <option>{tData}</option>

                    {status.map((status) => {
                        return (tData === status.label ? null : <option key={status.value} value={status.value}>{status.label}</option>)
                    })}
                </Form.Select>
            )
        }

        return tData;
      }
      
    if(jobs){
        return (
            <>
            <tbody>
             {jobs.map((data) => {
              return (
               <tr 
                   key={data._id}
                   className={data.decision === 'in progress' ? 'bg-in-progress' : `bg-${data.decision}`}
               >
                {columns.map(({ accessor }) => {
                 const tData = data[accessor] !== "unknown" ? data[accessor] : "——";
                 return (
                   <td 
                       key={accessor}
                       onMouseDown={(event) => mouseDownHandler(accessor, tData, data, event)}
                   >
                       {tdFiller(accessor, tData, data)}
                   </td>
                 )
                })}
               </tr>
              );
             })}
            </tbody>
            </>
           );
    }
   };
   
   export default TableBody;
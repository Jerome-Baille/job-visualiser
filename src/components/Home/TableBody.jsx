import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { putOpportunity } from "../../services/service";
import { getTokenAndUserId } from '../../services/auth';

const TableBody = ({ jobs, columns }) => {
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

    function backgroundColor(decision) {
        if (decision === 'negative') {
            return 'rgb(252, 228, 214)';
        } else if (decision === 'positive') {
            return 'rgb(169, 208, 142)';
        } else if (decision === 'in progress') {
            return 'rgb(221, 235, 247)';
        } else if (decision === 'expired') {
            return 'rgb(208, 206, 206)';
        } else {
            return 'white';
        }
      }

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
        var opportunity = {...data, decision: event.target.value} 

        getTokenAndUserId().then((res) => {
            var token = res.token;

            putOpportunity(token, opportunity)
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
        }).catch((err) => {
            console.log(err)
        })

      }

      const renderTooltip = (tData, data, props) => (
        <Tooltip id={data._id} {...props}>
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
            return       <Form.Select 
                            aria-label="Final decision on the candidacy"
                            id="decision"
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
        }

        return tData;
      }
      
    if(jobs){
        return (
            <tbody>
             {jobs.map((data) => {
              return (
               <tr 
                   key={data._id}
                   style={{'backgroundColor': backgroundColor(data.decision)}}
               >
                {columns.map(({ accessor }) => {
                 const tData = data[accessor] !== "unknown" ? data[accessor] : "——";
                 return (
                   <td 
                       key={accessor}
                       onMouseDown={(event) => mouseDownHandler(accessor, tData, data, event)}
                   >
                       {tdFiller(accessor, tData, data)}
                       {/* {accessor === "link" ?
                           <FontAwesomeIcon icon={faLink} />
                           : tData} */}
                   </td>
                 )
                })}
               </tr>
              );
             })}
            </tbody>
           );
    }
   };
   
   export default TableBody;
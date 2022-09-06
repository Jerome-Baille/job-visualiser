<table>
                        <thead>
                            <tr>
                                <th>Poste</th>
                                <th>Entreprise</th>
                                <th>Localisation</th>
                                <th>Type de poste</th>
                                <th>Lien de l'annonce ou site de l'entreprise</th>
                                <th>Date de candidature</th>
                                {/* <th>Date de relance prévisionnelle</th>
                                <th>Date des entretiens</th>
                                <th>Acceptation / Refus</th> */}
                                <th>Résultat final de la candidature</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(jobs).map((job, index) => (
                                <tr 
                                    key={index} 
                                    style={{'backgroundColor': backgroundColor(jobs[job].decision)}}
                                >
                                    <td
                                        onClick={() => navigate(`/job/${jobs[job]._id}`)} 
                                    >{jobs[job].name}</td>
                                    <td
                                        onClick={() => navigate(`/job/${jobs[job]._id}`)} 
                                    >{jobs[job].company}</td>
                                    <td
                                        onClick={() => navigate(`/job/${jobs[job]._id}`)} 
                                    >{jobs[job].location}</td>
                                    <td
                                        onClick={() => navigate(`/job/${jobs[job]._id}`)} 
                                    >{jobs[job].type}</td>
                                    <td className="job-link-container">
                                        <a href={jobs[job].link} className='job-link'>
                                            <FontAwesomeIcon icon={faLink} />
                                        </a>
                                    </td>
                                    <td
                                        onClick={() => navigate(`/job/${jobs[job]._id}`)} 
                                    >{jobs[job].date}</td>
                                    {/* <td>{reminderDate(jobs[job].date)}</td>
                                    <td>{jobs[job].interview === true ? jobs[job].interviewDate : ''}</td>
                                    <td>{jobs[job].decisionDate ? jobs[job].decisionDate : ''}</td> */}
                                    <td
                                        onClick={() => navigate(`/job/${jobs[job]._id}`)} 
                                    >{jobs[job].decision ? jobs[job].decision : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
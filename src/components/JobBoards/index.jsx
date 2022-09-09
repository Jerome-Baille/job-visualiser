// import { useState } from "react";
// import LoadingSpinner from "../LoadingSpinner";

const JobBoards = () => {
    // const [isLoaded, setIsLoaded] = useState(false);

    // if(isLoaded){
        return (
            <div className="main-container">
                <h1>Job Boards</h1>
                <ul>
                    <li>
                        <a href="https://www.linkedin.com/jobs/" target="_blank" rel="noreferrer">LinkedIn</a>
                    </li>
                    <li>
                        <a href="https://fr.indeed.com/?r=us" target="_blank" rel="noreferrer">Indeed</a>
                    </li>
                    <li>
                        <a href="https://www.hellowork.com/fr-fr/candidat/offres.html" target="_blank" rel="noreferrer">Hello Work</a>
                    </li>
                    <li>
                        <a href="https://www.welcometothejungle.com/fr/jobs" target="_blank" rel="noreferrer">Welcome to the Jungle</a>
                    </li>
                    <li>
                        <a href="https://bevopr.io/explorer-jobs" target="_blank" rel="noreferrer">Bevopr</a>
                    </li>
                    <li>
                        <a href="https://circular.io/candidates/" target="_blank" rel="noreferrer">Circular</a>
                    </li>
                    <li>
                        <a href="https://www.jean-paul.io/profil" target="_blank" rel="noreferrer">Jean Paul</a>
                    </li>
                </ul>
            </div>
        )
    // } else {
    //     return (
    //         <LoadingSpinner />
    //     )
    // }
}

export default JobBoards
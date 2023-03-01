// import { useState } from "react";
// import LoadingSpinner from "../LoadingSpinner";
import Linkedin from "../../assets/linkedin-icon.svg"
import Indeed from "../../assets/indeed-logo.svg"
import HelloWork from "../../assets/hello-work-logo.svg"
import WelcomeToTheJungle from "../../assets/wttj-logo.png"
import Bevopr from "../../assets/bevopr-logo.png"
import Circular from "../../assets/circular-logo.jpg"
import JeanPaul from "../../assets/jean-paul-logo.jpg"
import Kicklok from "../../assets/kicklox-logo.png"
import Apec from "../../assets/apec-logo.png"

const JobBoards = () => {
    // const [isLoaded, setIsLoaded] = useState(false);

    // if(isLoaded){
        return (
            <div className="main-container">
                <h1>Job Boards</h1>

                <div className="job-board__container">
                    <div className="job-board__card">
                        <a 
                            href="https://www.linkedin.com/jobs/" 
                            target="_blank" rel="noreferrer" 
                            className="job-board__link"
                        >
                            <div className="job-board__img-container">
                                <img src={Linkedin} alt="LinkedIn logo" />
                            </div>
                        </a>
                    </div>
                    <div className="job-board__card">
                        <a 
                            href="https://fr.indeed.com/?r=us" 
                            target="_blank" rel="noreferrer" 
                            className="job-board__link"
                        >
                            <div className="job-board__img-container">
                                <img src={Indeed} alt="Indeed logo" />
                            </div>
                        </a>
                    </div>
                    <div className="job-board__card">
                        <a 
                            href="https://www.hellowork.com/fr-fr/candidat/offres.html" 
                            target="_blank" rel="noreferrer" 
                            className="job-board__link"
                        >
                            <div className="job-board__img-container">
                                <img src={HelloWork} alt="Hello Work logo" />
                            </div>
                        </a>
                    </div>
                    <div className="job-board__card">
                        <a 
                            href="https://www.welcometothejungle.com/fr/jobs" 
                            target="_blank" rel="noreferrer" 
                            className="job-board__link"
                        >
                            <div className="job-board__img-container">
                                <img src={WelcomeToTheJungle} alt="Welcome to the Jungle logo" />
                            </div>
                        </a>
                    </div>
                    <div className="job-board__card">
                        <a 
                            href="https://www.apec.fr/candidat/recherche-emploi.html/emploi?motsCles=d%C3%A9veloppeur%20front&typesTeletravail=20767&niveauxExperience=101881" 
                            target="_blank" rel="noreferrer" 
                            className="job-board__link"
                        >
                            <div className="job-board__img-container">
                                <img src={Apec} alt="Apec logo" />
                            </div>
                        </a>
                    </div>
                    <div className="job-board__card">
                        <a 
                            href="https://bevopr.io/explorer-jobs" 
                            target="_blank" rel="noreferrer" 
                            className="job-board__link"
                        >
                            <div className="job-board__img-container">
                                <img src={Bevopr} alt="Bevopr logo" />
                            </div>
                        </a>
                    </div>
                    <div className="job-board__card">
                        <a 
                            href="https://circular.io/candidates/" 
                            target="_blank" rel="noreferrer" 
                            className="job-board__link"
                        >
                            <div className="job-board__img-container">
                                <img src={Circular} alt="Circular logo" />
                            </div>
                        </a>
                    </div>
                    <div className="job-board__card">
                        <a 
                            href="https://www.jean-paul.io/profil" 
                            target="_blank" rel="noreferrer" 
                            className="job-board__link"
                        >
                            <div className="job-board__img-container">
                                <img src={JeanPaul} alt="Jean Paul logo" />
                            </div>
                        </a>
                    </div>
                    <div className="job-board__card">
                        <a 
                            href="https://app.kicklox.com/matches" 
                            target="_blank" rel="noreferrer" 
                            className="job-board__link"
                        >
                            <div className="job-board__img-container">
                                <img src={Kicklok} alt="Kick Klox logo" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    // } else {
    //     return (
    //         <LoadingSpinner />
    //     )
    // }
}

export default JobBoards
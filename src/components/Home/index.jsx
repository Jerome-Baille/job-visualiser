import Table from "./Table";

const Home = () => {
        return (
            <>
                <div className="main-container">

                  <ul>
                    <h3>Color code</h3>
                    <li className="bg-negative">
                      Red: you received a "negative" answer to your application
                    </li>
                    <li className="bg-positive">
                      Green: you received a "positive" answer to your application
                    </li>
                    <li className="bg-in-progress">
                      Blue: your application is "in progress" (you got an interview)
                    </li>
                    <li className="bg-expired">
                      Grey: the job offer is no longer available but you did not receive any answer
                    </li>
                    <li>
                      White: the status of the job application is unknown at the moment
                    </li>
                  </ul>
                  <ul>
                    <h3>Features under development</h3>
                    <li>Put a select to display 10/20/50 or all results</li>
                    <li>Add a "Favorite" column</li>
                  </ul>
                    <Table />
                </div> 
            </>
        );
}

export default Home
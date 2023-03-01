import { Button } from "react-bootstrap";
import Table from "./Table";
import ExportData from "./Export";

const Home = () => {
  function handleRefresh() {
    localStorage.removeItem("jobs");
    window.location.reload();
  }

        return (
            <>
                <div className="main-container">
                  <section>
                    <div className="under-development">
                        <ul>
                          <h3>Features under development</h3>
                          <li>Add the possibility to display 10/20/50 or all results through a select input</li>
                          <li>Add a search bar</li>
                          <li>Add a "Favorite" column</li>
                        </ul>
                      <div>
                      <Button
                        variant="outline-primary"
                        onClick={handleRefresh}
                      >
                        Refresh
                      </Button>
                    </div>
                    </div>

                  </section>


                  <ul className="color-legend">
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
                    <ExportData />

                    <Table />
                </div> 
            </>
        );
}

export default Home
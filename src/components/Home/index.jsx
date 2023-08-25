import { Button, Tab, Tabs, Stack } from "react-bootstrap";
import Table from "./Table";
import ExportData from "./Export";

const Home = () => {
    function handleRefresh() {
        localStorage.removeItem("jobs");
        window.location.reload();
    }

    return (
        <div className="background-container">
            <main className="main-container">
                <div className="home-tabs">
                    <Tabs
                        defaultActiveKey="refresh"
                        id="justify-tabs"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="refresh" title="Refresh">
                            <div className="refresh-container">
                                <Button
                                    variant="outline-primary"
                                    onClick={handleRefresh}
                                >
                                    Refresh
                                </Button>
                            </div>
                        </Tab>

                        <Tab eventKey="color" title="Color code">
                            <Stack gap={3}>
                                <div className="p-2 bg-negative">
                                    Red: you received a "negative" answer to your application
                                </div>
                                <div className="p-2 bg-positive">
                                    Green: you received a "positive" answer to your application
                                </div>
                                <div className="p-2 bg-in-progress">
                                    Blue: your application is "in progress" (you got an interview)
                                </div>
                                <div className="p-2 bg-expired">
                                    Grey: the job offer is no longer available but you did not receive any answer
                                </div>
                                <div className="p-2">
                                    White: the status of the job application is unknown at the moment
                                </div>
                            </Stack>
                        </Tab>

                        <Tab eventKey="export" title="Export">
                            <ExportData />
                        </Tab>
                    </Tabs>
                </div>

                <hr className="mb-0" />

                <Table />
            </main>
        </div>
    );
}

export default Home
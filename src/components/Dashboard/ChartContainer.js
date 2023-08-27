import React, { useState, useEffect, useRef } from 'react';
import { LineChart, BarChart } from './ChartPresentation';
import { Card, Form } from 'react-bootstrap';
import LoadingSpinner from '../LoadingSpinner';

const ChartContainer = ({ jobs, isLoaded }) => {
    const [selectedWeek, setSelectedWeek] = useState(0); // Default: current week
    const lineChartCardBodyRef = useRef(null);
    const barChartCardBodyRef = useRef(null);
    const [lineChartDimension, setLineChartDimension] = useState({ height: 300, width: 400 });
    const [barChartDimension, setBarChartDimension] = useState({ height: 300, width: 400 });

    const handleWeekChange = event => {
        setSelectedWeek(parseInt(event.target.value, 10));
    };

    // Define the month order array
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Data processing for line chart (applications per month)
    const today = new Date();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(today);
        date.setMonth(today.getMonth() - 5 + i);
        return date;
    });

    const applicationsPerMonth = last6Months.reduce((result, currentDate) => {
        const month = monthOrder[currentDate.getMonth()];
        result[month] = 0; // Initialize count to 0 for each month
        return result;
    }, {});

    const monthsWithData = new Set(); // Keep track of months with data

    jobs.forEach(job => {
        const jobDate = new Date(job.applicationDate);
        if (jobDate >= last6Months[0] && jobDate <= last6Months[last6Months.length - 1]) {
            const month = monthOrder[jobDate.getMonth()];
            if (applicationsPerMonth.hasOwnProperty(month)) {
                applicationsPerMonth[month]++;
                monthsWithData.add(month); // Mark month as having data
            }
        }
    });

    const monthlyApplicationData = monthOrder
        .filter(month => monthsWithData.has(month)) // Filter out months without data
        .map(month => ({
            month,
            count: applicationsPerMonth[month] || 0,
        }));

    // Data processing for bar chart (applications per day over the selected week)
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const previousMonday = new Date(today);
    previousMonday.setDate(today.getDate() - today.getDay() + 1); // Go back to previous Monday
    const mondayOfSelectedWeek = new Date(previousMonday);
    mondayOfSelectedWeek.setDate(previousMonday.getDate() - selectedWeek * 7);
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(mondayOfSelectedWeek);
        date.setDate(mondayOfSelectedWeek.getDate() + i);
        return date;
    });

    const applicationsPerDay = dayNames.map((dayName, dayIndex) => ({
        day: dayName,
        count: jobs.filter(job => {
            const applicationDate = new Date(job.applicationDate);
            return applicationDate.getDay() === (dayIndex + 1) % 7 && // Adjust the index
                lastSevenDays.some(day => day.toDateString() === applicationDate.toDateString());
        }).length,
    }));

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                if (entry.target === lineChartCardBodyRef.current) {
                    setLineChartDimension({
                        height: entry.contentRect.height,
                        width: entry.contentRect.width
                    });
                }
                if (entry.target === barChartCardBodyRef.current) {
                    setBarChartDimension({
                        height: entry.contentRect.height,
                        width: entry.contentRect.width
                    });
                }
            });
        });

        if (lineChartCardBodyRef.current) {
            resizeObserver.observe(lineChartCardBodyRef.current);
        }
        if (barChartCardBodyRef.current) {
            resizeObserver.observe(barChartCardBodyRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [lineChartCardBodyRef, barChartCardBodyRef]);

    return (
        <div>
            {isLoaded ? (
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mb-4">
                        <Card className="chart-card">
                            <Card.Header className='flex justify-content-center align-items-center'>
                                <Card.Title>Applications per Month</Card.Title>
                            </Card.Header>
                            <Card.Body ref={lineChartCardBodyRef} id='line-chart-container' className="d-flex flex-grow-1 justify-content-center align-items-center">
                                {lineChartDimension.width && lineChartDimension.height && (
                                    <LineChart
                                        data={monthlyApplicationData}
                                        monthOrder={monthOrder}
                                        width={lineChartDimension.width}
                                        height={lineChartDimension.height}
                                    />
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-sm-12 col-lg-4">
                        <Card className="chart-card">
                            <Card.Header className='flex justify-content-center align-items-center'>
                                <Card.Title>Applications per Day.</Card.Title>
                            </Card.Header>
                            <Card.Body ref={barChartCardBodyRef} id="bar-chart-container" className="d-flex flex-grow-1 justify-content-center align-items-center ">
                                {barChartDimension.width && barChartDimension.height && (
                                    <BarChart
                                        data={applicationsPerDay}
                                        width={barChartDimension.width}
                                        height={barChartDimension.height}
                                    />
                                )}
                            </Card.Body>
                            <Card.Footer className="d-flex flex-column justify-content-end">
                                <Form.Select
                                    aria-label="Select the week you want to display."
                                    id="weekSelect"
                                    value={selectedWeek}
                                    onChange={handleWeekChange}
                                    className="w-50 align-self-end"
                                >
                                    <option value={0}>This Week</option>
                                    <option value={1}>Previous Week</option>
                                    <option value={2}>Two Weeks Ago</option>
                                    {/* Add more options if needed */}
                                </Form.Select>
                            </Card.Footer>

                        </Card>
                    </div>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};

export default ChartContainer;

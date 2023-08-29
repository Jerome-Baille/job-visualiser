import React from 'react';
import { Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTachographDigital, faHandshake, faList } from '@fortawesome/free-solid-svg-icons';


function HowToUse() {
  return (
    <div className='background-container'>
      <main className="main-container">
        <Card>
          <Card.Body>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h1>How to Use the App</h1>
              <p>Welcome to the app! Here's a step-by-step guide on how to make the most of its features:</p>
            </div>

            <hr />

            <Card.Title className='d-flex align-items-baseline gap-3'>
              <FontAwesomeIcon icon={faTachographDigital} />
              <h3>Dashboard: Monitor Your Progress</h3>
            </Card.Title>
            <p>The dashboard serves as your command center. Here's what you can find:</p>
            <ul>
              <li>Job Search Statistics: Keep track of your total applications, interviews, and offers.</li>
              <li>To-Do List: Stay organized by adding tasks that need attention. Tick them off as you go!</li>
              <li>Ongoing Interviews: See a list of applications that have interviews in progress.</li>
            </ul>

            <hr />

            <Card.Title className='d-flex align-items-baseline gap-3'>
              <FontAwesomeIcon icon={faList} />
              <h3>List of Job Applications: Manage Your Applications</h3>
            </Card.Title>
            <p>Your applications are neatly organized in a table:</p>
            <ul>
              <li>Use the filter options to sort by status, date, or other criteria.</li>
              <li>Search for specific applications using the search input.</li>
              <li>Click on an application to view or edit its details.</li>
              <li>Update the status as your application progresses through the pipeline.</li>
            </ul>

            <hr />

            <Card.Title className='d-flex align-items-baseline gap-3'>
              <FontAwesomeIcon icon={faCirclePlus} />
              <h3>Create Job Application: Add New Opportunities</h3>
            </Card.Title>
            <p>Ready to apply for a new job? Here's how:</p>
            <ul>
              <li>Click on "Create" and fill in the necessary details.</li>
              <li>Include the job title, company, application status, and more.</li>
              <li>Hit "Save" to add the application to your list.</li>
            </ul>

            <hr />

            <Card.Title className='d-flex align-items-baseline gap-3'>
              <FontAwesomeIcon icon={faHandshake} />
              <h3>Job Boards: Explore Available Opportunities</h3>
            </Card.Title>
            <p>Discover new opportunities from various job boards:</p>
            <ul>
              <li>Browse a list of job boards to find openings that match your interests.</li>
              <li>Click on a board to view its current listings.</li>
              <li>Apply for positions directly through the linked listings.</li>
            </ul>

            <hr />

            <p>
              Now that you have a better understanding of the app's features, you're ready to take control of your job search journey!
            </p>
          </Card.Body>
        </Card>
      </main>
    </div>
  );
}

export default HowToUse;
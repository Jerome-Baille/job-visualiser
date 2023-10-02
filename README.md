# Job Tracker

[![React](https://img.shields.io/badge/React-17.0.2-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14.17.6-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4.8-brightgreen)](https://www.mongodb.com/)

[Job Tracker Live Demo](https://job-tracker.jerome-baille.fr)

Job Tracker is an application designed to help job seekers keep track of their job applications, manage their job search process, and gain insights into their job search statistics.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Contact Information](#contact-information)
- [Acknowledgments](#acknowledgments)

## Features

- User Authentication:
  - Register, log in, update account details, and delete account.
  - Log out when needed.

- Job Application Management:
  - Manually add job application details (company name, job title, application date, etc.).
  - Import job application data using a Google Chrome extension.

- Application Dashboard:
  - View a table of job applications with color-coded statuses (in progress, positive response, negative response, etc.).
  - Filter job applications by position, company name, job type (remote, on-site, hybrid), and status.

- Statistics:
  - Visualize day-to-day and monthly statistics of your job search.
  - Gain insights into your job search progress.

- Job Boards:
  - Access a list of job boards to facilitate your job search.

## Technologies Used

- Frontend:
  - React
  - Create React App
  - D3 (for statistics)
  - Axios
  - React Bootstrap
  - SCSS (Sass)

- Backend:
  - Node.js
  - Express.js

- Database:
  - MongoDB
  - Mongoose (ORM)

## Installation

To run the Job Tracker app locally, follow these steps:

1. Clone this repository.
2. Navigate to the frontend and backend directories and install dependencies using `npm install`.
3. Set up your MongoDB database and update the configuration in the backend.
4. Run the backend server using `npm start` in the backend directory.
5. Run the frontend using `npm start` in the frontend directory.

## Usage

1. Register or log in to your account.
2. Update your account details or delete your account when needed.
3. Add job applications manually or using the Chrome extension.
4. View and manage your job applications in the dashboard.
5. Gain insights into your job search statistics.
6. Access job boards to find new opportunities.

## API Integration

Job Tracker integrates with various job boards and websites to provide job search functionality. More details about specific integrations can be found in the documentation.

## Contributing

Contributions to Job Tracker are welcome. Please submit issues or pull requests.

## License

This project is licensed under the MIT License.

## Authors

- [Jerome BAILLE](https://github.com/Jerome-Baille) - Frontend Development
- [Jerome BAILLE](https://github.com/Jerome-Baille) - Backend Development

## Contact Information

For questions or support, please contact through [my website](https://jerome-baille.fr).

## Acknowledgments

- Thanks to the React, Node.js, and MongoDB communities for their fantastic tools and libraries.
- Special thanks to the contributors who helped make this project possible.
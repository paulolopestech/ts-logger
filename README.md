# TS-Logger
A logging application written in Typescript that manages logs from various connected applications. Logger utilizes WebSocket connections to receive logs, store them in a MongoDB database, and broadcast the information to dashboards


[![CI](https://github.com/paulolopestech/logger/actions/workflows/ci.yaml/badge.svg)](https://github.com/paulolopestech/logger/actions/workflows/ci.yaml)

## Video - Presentation
[![Apresentação](https://img.youtube.com/vi/9YteyxlCRbM/0.jpg)](https://youtu.be/9YteyxlCRbM)

[Frontend](https://github.com/paulolopestech/logger-ts-frontend)

## Features
- <b>WebSocket Integration:</b> Two WebSocket servers, one on port 3002 to receive logs and another on port 3003 to send data to dashboards.

- <b>MongoDB Database:</b> Stores log documents efficiently for later analysis and retrieval.

- <b>Express HTTP Server:</b> Runs on port 3001, handling routes to receive and return data for dashboards.

- <b>Log Connection Handling:</b> Records logs in the database and sends them to connected dashboards via WebSocket (port 3003).

- <b>Real-time Alerting:</b> Evaluates log messages, prioritizes them, and sends alerts (potentially via email based on priority) while broadcasting logs to connected dashboards.

- <b>Connection Loss Handling:</b> Logs critical alerts in the database and notifies dashboards and email subscribers using AWS SES upon losing connection with an application.

## Prerequisites
- Node.js installed
- MongoDB installed and running
- AWS SES credentials set up for email notifications

## Installation

1. Clone the repository:
```
git clone git@github.com:paulolopestech/logger.git
```

2. Install dependencies:
```
npm install
```

## Configuration
### Set up MongoDB:

Ensure MongoDB is running.

Configure MongoDB connection settings in src/infra/config/database/database.ts.
### Set up AWS SES:

Configure SES credentials and settings in src/infra/config/mailer.ts.

## Usage
### Development
Run the development server:
```
npm run start:dev
```


## Production
Build and start the production server:
```
npm start
```

## Logging
To log messages, connect to the WebSocket server running on port 3002. Logger will store and process the logs based on their content and priority.

## Contributing
Feel free to contribute by opening issues or submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.

## Acknowledgments
Inspired by the need for efficient and real-time log management in distributed systems.

Built with Typescript, Express, MongoDB, and WebSocket for robust performance.

AWS SES used for reliable email notifications.

Project initially developed for the final task of the Software Engineering discipline at the National Telecommunications Institute.

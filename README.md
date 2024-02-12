# ASSIGNMENT-TASK: Full Stack Application

Assignment-Task is a full-stack user authentication and authorization application built with Nest.js on the backend and React on the frontend.

## Features

### Frontend

- React app setup with Vite tool
- Utilization of React Hooks for state management
- Integration of Redux Toolkit for query and caching
- Utilization of Bootstrap for styling and layout
- Implementation of React Router DOM v6 for routing
- Creation of private routes and route guards to manage user access
- Nice looking input validation messages with [react-toast library](https://github.com/moharnadreza/react-toast)
- Plus, additional features to enhance user experience and functionality

For more information on these features and their implementations, refer to the following resources:

- [React Hooks documentation](https://reactjs.org/docs/hooks-intro.html)
- [Redux Toolkit documentation](https://redux-toolkit.js.org/)
- [Bootstrap documentation](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
- [React Router DOM v6 documentation](https://reactrouter.com/docs/en/v6/getting-started/introduction)

### Backend

- Fully integrated API with any frontend client
- JWT token-based authentication mechanism with Passport.js
- Auth guard to restrict routes for authorized users
- Input field validations
- CORS setup and other security best practices
- Prisma ORM with MongoDB
- Custom logger for tracking logs and request IPs
- Custom exception handling
- Password hashing
- Refresh token mechanism
- Rate-limiting with Nest.js throttler module
- Written in TypeScript

For more information on these features and their implementations, refer to the following resources:

- [Passport.js documentation](http://www.passportjs.org/)
- [Prisma ORM documentation](https://www.prisma.io/docs)
- [Nest.js throttler module documentation](https://docs.nestjs.com/security/rate-limiting)

## Setup Guide

This guide will walk you through setting up the backend of the Assignment-Task project.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (<https://nodejs.org/>)
- MongoDB (<https://www.mongodb.com/>) OR [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- npm (comes with Node.js installation)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/assignment-task.git
```

## Frontend Setup Guide

1. Navigate to the app folder:

```bash
cd assignment-task/app
```

2. Install dependencies:

```bash
npm install
```

3. Rename the .env.example file to .env and replace the placeholder values with your own.

4. Start the server

To start the server with live reload:

```bash
npm run dev
```

5. Access the application in your browser:

Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

## Backend Setup Guide

1. Navigate to the backend folder:

```bash
cd assignment-task/backend
```

2. Install dependencies:

```bash
npm install
```

3. Rename the .env.example file to .env and replace the placeholder values with your own.

4. Sync the database with Prisma:

```bash
npx prisma db push
```

Look at the prisma documentation for more information: [Prisma documentation](https://www.prisma.io/docs)

5. Start the server

To start the server with live reload:

```bash
npm run start:dev
```

Or simply:

```bash
npm start
```

### Testing Guide

1. **Signup**
   - **Method**: POST
   - **Path**: <http://localhost:5000/api/v1/auth/sign-up>
   - **Body**:
     - name
     - email
     - password

2. **Signin**
   - **Method**: POST
   - **Path**: <http://localhost:5000/api/v1/auth/sign-in>
   - **Body**:
     - email
     - password

3. **Logout**
   - **Method**: POST
   - **Path**: <http://localhost:5000/api/v1/auth/logout>
   - **Authorization Header**: Bearer token (accessToken)

4. **Refresh**
   - **Method**: POST
   - **Path**: <http://localhost:5000/api/v1/auth/refresh>
   - **Authorization Header**: Bearer token (refreshToken)

## Conclusion

Thank you for exploring the Assignment-Task project! I hope this documentation has provided you with a comprehensive understanding of both the backend and frontend aspects of our application. Whether you're a developer looking to contribute, a user interested in our features, or simply curious about the technology stack, I appreciate your interest and support.

If you have any questions, feedback, or suggestions, feel free to reach out to me. I am always eager to hear from the community and improve. Happy coding! 🚀✨👩‍💻👨‍💻

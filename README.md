CRM System Backend

This repository contains the backend implementation of a basic Customer Relationship Management (CRM) application. The backend is designed to manage customer data such as contacts, companies, and interactions. It includes functionalities like customer management, user authentication, search and filtering, and error handling.
Installation:

Clone the repository:
git clone https://github.com/puduri-vinay-kumar/CRM-app-backend.git
cd crm-backend

Install dependencies:
npm install  # for Node.js backend, adjust for your environment

Configure environment variables: Create a .env file in the root directory and add the following:
.env file
DB_HOST=database-1.ctu6cq40wy8v.ap-south-1.rds.amazonaws.com

DB_USER=vinaykumar

DB_PASS=Vinay2003

DB_NAME=database1

JWT_SECRET=my-key

NODE_ENV=development

PORT=5000

adjust packeg,json script object:
scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },

npm run dev
The application will now be running locally at http://localhost:5000. 

API Documentation:
The API provides endpoints to manage customers and user authentication. You can view the full documentation using Swagger/OpenAPI:
Base Url: http://localhost:5000/api-docs 

Authentication:
POST /auth/register: Register a new user (requires username, email, and password).
POST /auth/login: Login to get a JWT token (requires email and password).

Customer Management
GET /customers: Get a list of all customers. Supports query parameters for filtering and searching by name, email, phone, and company.
GET /customers/:id: Get a specific customer by id.
POST /customers: Create a new customer (requires name, email, and phone).
PUT /customers/:id: Update a customer’s details (requires id).
DELETE /customers/:id: Delete a customer by id.

Security:
Passwords are hashed using bcrypt before being stored in the database.
JWT tokens are used to authenticate API requests.
All endpoints that require authentication expect a valid JWT in the Authorization header.

Features
CRUD Operations: Perform Create, Read, Update, and Delete on customer data.
Search and Filter: Search customers by name, email, or phone, and filter by company.
User Authentication: Secure login and registration with JWT-based authentication.
Error Handling: Proper validation and error messages for failed requests.
Testing
To run tests for the backend, you can use a testing framework like Jest or Mocha. Ensure that the tests are properly written for the following:

User authentication (login, registration).
CRUD operations for customers.
Validation and error handling.

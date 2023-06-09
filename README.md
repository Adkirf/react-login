# Express Server and React Client with Login and Signin Functionality
This is an Express server and React client with two endpoints that allow users to signin and login. The server uses JWT for authentication and authorization. The server is designed to work with a build-in database of users, and can be easily modified to work with various database systems. The React client uses the react-auth-kit library for authentication and authorization.

## Prerequisites
Before you begin, ensure you have met the following requirements:

 - You have Node.js installed on your local machine.

## To install the server, follow these steps:

1. Clone the repository to your local machine.
2. Run npm install to install all dependencies.
3. Create a .env file in the root directory of the project with the following variables:
``
JWT_SECRET=[your JWT secret]
``
4. Run npm start to start the server.

## To install the client, follow these steps:

1. Clone the repository to your local machine.
2. Run npm install to install all dependencies.
3. Run npm start to start the client.

## Endpoints
### Signin
The /signin endpoint allows users to create an account. The endpoint accepts a JSON object with the following properties:

- username: a string representing the user's username.
- password: a string representing the user's password.

If the username is already taken, the server will return a 300 status code with a JSON object containing the message "username already exists". If the user is successfully created, the server will return a 200 status code with a JSON object containing the user's information.

### Login
The /login endpoint allows users to login to their account. The endpoint accepts a JSON object with the following properties:

- username: a string representing the user's username.
- password: a string representing the user's password.

If the user does not exist or the password is incorrect, the server will return a 300 status code with a JSON object containing an error message. If the user is successfully authenticated, the server will return a 200 status code with a JSON Web Token (JWT) that can be used to authenticate future requests.

## React Client
The React client has three routes:

- /: The main route that requires authentication. If the user is not authenticated, they will be redirected to the /login route.
- /home: The home page for authenticated users.
- /login: The login page.

The client uses the RequireAuth component from the react-auth-kit library to protect the main route. The RequireAuth component takes the loginPath prop, which specifies the path to the login page.

## Built With
- Express - The web framework used for the server
- React - The web framework used for the client
- JWT - JSON Web Tokens for authentication and authorization
- dotenv - Environment variables management
- cors - Cross-origin resource sharing
- react-auth-kit - Authentication and authorization library for React
- nedb - Database running within the Server

# Notes Keeper

**React Note Taking Web App**

Notes keeper is a web application that allows users to keep track of their notes. It is built using React for the frontend and Node.js for the backend, and it interacts with a RESTful API to handle user authentication and data storage.

Notekeeper provides the following features:

-   **Signin and Login**: Users can create an account or login with their existing credentials. Notekeeper uses JSON Web Tokens (JWT) for authentication and authorization.

-   **Notes Management:** Users can add, delete, and edit notes. The notes are saved to a backend database and retrieved when the user logs in again.

This documentation provides instructions for installing, configuring, dependency information and using Notes keeper, as well as documentation for the API endpoints used by the application.

## Architecture

The project is built using a client-server architecture, with React as the client-side framework and Node.js as the server-side framework. The frontend and backend communicate with each other via a RESTful API. React's component-based architecture is used to implement the client site. Components are modular and reusable, allowing for a high degree of flexibility and maintainability. React's state management system and Redux state tate management system are used to manage the application's data and update the view in response to user input.

## Available Scripts

In the project directory, you can run:

**`npm start`**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browse

The page will reload when you make changes.\
You may also see any lint errors in the console.

**`npm test`**

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**`npm run build`**

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## API

**Authentification**

-   **POST/api/v1/auth/signup:** create a new user account
    Signin a user with their First name , Last name, email, password and confirm password

_Request_

```bash
 {
 "firstName": "Mahamudur",
 "lastName": "Jewel",
 "email": "jewel@example.com"
}
```

_Response_

```bash
{
  "token": "[example JWT with payload] eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

-   **POST/api/v1/auth/login:** Login to you user account
    Login with email and password

_Request_

```bash
 {
 "email": "jewel@example.com"
 "password": "secreT123"
}
```

**Response**

```bash
{
  "token": "[example JWT with payload]
}
```

**Notes**

-   **GET/api/v1//notes/all:** Login to you user account
    Get all notes for a user.

_Request Header_

```bash
Authorization: Bearer [JWT token]
```

**Response**

```bash
[
  {
    "createdAt": "2022-02-22T18:33:49.087Z",
    "title": "Note 1",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "user": "63f7bc27da9a74103a6fa361"
    ""updatedAt": "2022-02-22T18:33:49.087Z""
    "__v": 0
    "_id": "63f7bc27da9a74103a6fa361",

  },
 {
    "createdAt": "2022-02-22T18:33:49.087Z",
    "title": "Note 2",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "user": "63f7bc27da9a74103a6fa361"
    ""updatedAt": "2022-02-22T18:33:49.087Z""
    "__v": 0
    "_id": "63f7bc27da9a74103a6fa361",

  },
]
```

-   **Post/api/v1/create/new/notes:** Creating a new note

_Request Header_

```bash
Authorization: Bearer [JWT token]
```

_Request_

```bash
{
  "title": "Note Title",
  "description": "Note content."
}
```

_Response_

```bash
{
  "title": "Note Title",
  "description": "Note content."
  "user": "ee56trdf565tgfhgghgf55g76r"
}
```

## Contributing

If you'd like to contribute to the project, please fork the repository and create a pull request. All contributions are welcome!

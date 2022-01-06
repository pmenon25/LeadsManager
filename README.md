# Lead Management Application

## Overview
This application provides basic CRUD functionality to add, remove, update and delete leads.
The technologies used are React and Bootstrap for frontend UI with Django and PostgreSQL as the
backend stack.

## REST API endpoints

| Endpoint            | HTTP Operation | Description                                   |
| ------------------- | -------------- | --------------------------------------------- |
| `/lead/`            | GET            | Get all leads                                 |
| `/lead/:id/`        | GET            | Get lead corresponding to given ID            |
| `/lead/add/`        | POST           | Add a new lead                                |
| `/lead/:id/update/` | PUT            | Update the lead corresponding to the given ID |
| `lead/:id/delete/`  | DELETE         | Delete the given lead                         |


## Building and Running the application
Start the application using the provided shell script:

```
$ ./run.sh
```

This builds Docker images for the frontend and backend containers and starts them.

Thereafter, the web application can be accessed at http://localhost:3000. The backend service
is running at http://localhost:8000.

## Testing
Backend API testing is implemented using the Django REST API client [4]. Frontend (React)
testing is implemented using Jest + React Testing Library [1].

Frontend tests can be executed from the `frontend` directory by issuing the command:

```
$ npm test
```

Tests for the backend can be executed from the `backend` directory by issuing the command:

```
$ python3 manage.py test
```

## Known Limitations
- Both backend and frontend testing coverage could be improved. The current tests do not cover the full scope of the functionality.
- Running the frontend tests currently issues a warning due to an unimplemented DOM component
in the mock library as well as one due to modifying component state from an async method. 


## References
[1] React Testing Library documentation (https://testing-library.com/docs/)
[2] Django Rest Framework documentation (https://www.django-rest-framework.org/)
[3] StackOverflow questions for React debugging.
[4] https://www.django-rest-framework.org/api-guide/testing/

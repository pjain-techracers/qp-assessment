# Grocery/Order Management for QuestionPro - NodeJs+PostgreSQL

Application implement grocery mangement system which implements authentication with JWT and authorisation with RBAC strategy. It also exposes CRUD API endpoints for Grocery and Order model. 

## Features
- Application uses SQL database - PostgreSQL to create service and order tables
- Have Dockerfile to test application using docker
Functional
1. Admin Role:
   - Add new grocery items to the system
   - View existing grocery items
   - Remove grocery items from the system
   - Update details (e.g., name, price) of existing grocery items
   - Manage inventory levels of grocery items
2. User/Customer Role:
   - View the list of available grocery items
   - Ability to book multiple grocery items in a single order
   - Fetch only his/her orders

## Environment
- NodeJs [v18+](https://nodejs.org/en/download/)
## Packages used
- Express [v4.18.2](https://www.npmjs.com/package/express) - FLEXIBLE Node.js WEB APPLICATION FRAMEWORK
- Sequelize [v6.6.4](https://www.npmjs.com/package/sequelize) - ORM
- PostgreSQL [v8.6.0](https://www.npmjs.com/package/pg) -> SQL DATABASE

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependancies. In the root folder run below command.

```bash
npm install
```

## Usage
To run server run

```bash
npm start
```

Else 
- To start your server, run `node server.js`.  Open up your favorite browser and navigate to http://localhost:4000/ and you should see "Hello World!".

Fix eslint of javascript files
```bash
npm run lint:fix
```
## Run with Docker
Build the docker image
```bash
docker build -t order-management-qp .
```
Run the docker image 
```bash
docker run -d -p 4000:4000 order-management-qp
```

## Folder Structure

```
  ├───config
  ├───controller
  ├───middlewares
  ├───models
  ├───routes
  ├───utils
  └───constants.js
```

- config - Managing DB connection
- controller - Business logic for order and services
- models - Schema definition for order and services
- routes - API path exposed in the network
- test - Some utility functions
- middlewares - Middlewares to check request and response
- constants - App constants


## Assumptions
1. There are only 2 roles in the system.
2. Application uses postgresql
3. Since order and groceries are less, there is not pagination and all orders/services will be fetched at once

## Future/Production Scope

1. Pagination to be included in all the fetch APIs.

## Entities - DB Tables

1. User - stopre all users(admin/customers)
2. Grocery - store all the groceries in the system
3. Order - store all the orders placed by customer
5. Order-items - Many to many relationship model to store grocery and order



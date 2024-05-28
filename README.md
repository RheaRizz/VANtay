# VANtay Final Project

## SETTING UP VANTAY WEB APPLICATION 

##Setting up the local database

Inside the .env copy paste the structured url:

DATABASE_URL="postgresql://postgres:12345@localhost:5433/vantay-clone?schema=public"

Create a new postgres database and replace the database url and with database credentials.
Apply prisma migration and run the command prompt in the vs code terminal:

"npx prisma migrate dev --name init"


##Running the server for the backend part:

Reinstall the packages/ node modules:

'npm install'

'npm install -g nodemon'

'npm install cors'
'npm install @types/cors --save-dev'

After installing the packages it should run the localhost port: 3000:

"[]: Server is running at http://localhost:3000"


##Running the react-app for the front-end part:

Reinstall the packages for react app

'npm install'

Other packages needs to be installed:

'npm install web-vitals'
'npm install react-router-dom'

After installing the packages it should display different localhost port for the web application.


##Web Application Signup Page

Start signing up for new account

Apply the appropriate User Role: "CASHIER" or "ADMIN"
User Role can access both dashboards due to an internal case of web application" 

##Web Application Login Page

Login the new created account and password
Invalid data will results to "Login Failed"

##VANTAY Web Application Features

After creating new user/ logging in to your account it should redirect to your homepage profile.

##Web Application UserRole: ADMIN

MANAGE USER: In the Admin Dashboard, you can see the list of users in Manage Users that can update or delete the existing user.

MANAGE VAN: Create Van to be used for trips and input the valid data for Model, License Plate, Capacity, UserID

MANAGE TRIP: Create Trip to manage tickets and input the valid data for Standby Time, Departure Time, Destination, Driver Nam and Select Available Vans.

MANAGE TICKET: In the Admin Dashboard, the admin can only update and delete the ticket created in the cashier dashboard.

##Web Application UserRole: CASHIER 

In the Cashier Dashboard, all trips were displayed and can manage to generate new ticket.

MANAGE TICKET: The cashier will create a new ticket according to the passenger data 
    (
     Passenger Name, 
     Passenger Classification: Student/Regular/PWD, 
     Passenger Address, 
     Passenger Phone No, 
     Date: when the ticket is created, 
     Destination, 
     Seat No: depends on the capacity of van, 
     Fare
    )

## SETTING UP TEST FOR UNIT TESTING


## SETTING UP TEST FOR INTEGRATION TESTING (BACKEND) : JEST, SUPERTEST

##Install packages for test 

'yarn add jest ts-jest @types/jest'

'yarn add supertest @types/supertest

'yarn ts-jest config:init'
    /** @type {import('ts-jest').JestConfigWithTsJest} */
    module.exports = {
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: [],
      verbose: true,
      forceExit: true,

      Modify testMatch: "'**/*.spec.ts"
};

Modify the package.json:
    "scripts": {
       "test": "jest"
    },

##Running Integration Testing:
note: for effective testing comment out other tests to focus on one specific test. 


## SETTING UP TEST FOR SYSTEM TESTING: SELENIUM

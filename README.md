# NodeJS Phone Numbers API 

Backend NodeJS Developer Technical Challenge. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Swagger](#swagger)
- [Doing](#doing)

## Installation

Make sure you have Docker running. Download to your project directory, go to your root project dir and run:
```
docker-compose up
```

It will download and start all the necessary services to run this project, which are:
- MongoDB
- NodeJS/Express

When the server runs, it creates some fake data for testing in MongoDB.
- Phone numbers:
```
[
    { number: '123-456-7890', allocatedTo: null },
    { number: '123-456-7891', allocatedTo: null },
    { number: '123-456-7892', allocatedTo: null },
]
```

- Organizations:
```
[
    { name:'Org1' },
    { name:'Org2' },
    { name:'Org3' },
]
```

## Usage

You should have the following urls available:

- Express application: `http://localhost:3000`
- MongoDB: `http://localhost:27017`

The following endpoints should work correctly by using any http client:

##### Public URLs
- POST   `http://localhost:3000/api/users/login` (Get JWT token), with body in JSON format using:
```
{
    "username":"user",
    "password":"password"
}
```
It will return a JWT token, wich has to be used as `Bearer Token` for the private urls.    

##### Private URLs
- GET    `http://localhost:3000/api/organizations/get-all/` (Get all organizations)
- GET    `http://localhost:3000/api/phone-numbers/available-numbers` (Get all available phone numbers)
- GET    `http://localhost:3000/api/users/phone-numbers` (Get users with assigned phone numbers for an organization) with Body in JSON format:
```
{
    "organizationId":"string"
}
```
- POST   `http://localhost:3000/api/users/allocate` (Allocate a phone number to a user), with Body in JSON format:
```
{
  "organizationId": "string",
  "IdPassport": "string",
  "name": "string",
  "surname": "string"
}
```

- DELETE `http://localhost:3000/api/users/deallocate/{IdPassport}` (Deallocate a phone number from a user) 


If you use Postman, the file [NODE_VODAFONE.postman_collection.json](NODE_VODAFONE.postman_collection.json) has these endopints ready to use. Just change the data to use it.\
Here you can see instructions about [how to import postman collections](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/).

## Swagger

Just use your browser to access the following url:

- `http://localhost:3000/api-docs`

## Doing

- Improve error handling
- Tests
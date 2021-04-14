

# Funk-o-Fone API

## Created with Express, Node and MongoDB

This project was created under MongoDB and Mongoose, Express and Node to develop all methods to Create, Read, Delete, or Update a phone. 

<br>

## Install app dependencies

In project root folder, run following command to install all dependencies of project

`
npm i
`

or 

`
npm install
`

<br>

## Enviroment variables

I created .env.example file, but for this case, I set the values that I use to develop this project. If you use it, you must copy the file and change name by **.env** and set variables whit data I writed in .env.example.

<br>


## Install DB

First all run `mongod` in one command tab to run you Mongo server, this command start mongo daemon and wait connections in port (usually in port 27017).

In first moment, when project is running, you must set data in DB **(I assume you have mongo installed and running with the mongod daemon)**

<br>

To set first data to test front app, run this command in root folder:


`
npm run install:db
`

<br>

If it is ok, you will see a message: *connected to MongoDB in funkofone*, means that a connection to the database has been opened, the funkofone collection with data has been inserted and the connection has subsequently been closed.

<br>

## Run API

To run API, in the root folder, you must run this command: 

`
npm run dev
`

Is **dev** because is the enviroment to develop the API. 


This will make the service up and you can you can test the API. And you can see the message **Example app listening at [localhost]** and *connected to MongoDB in funkofone*. Thats means you are connected. Great!

<br>


## Run lintern

In this project are configured eslint with prettier, to set lint and show analyze files, you should run this command:

`
npm run lint
`

If you want fix problems that can be resolved automatically, you must run this command:

`
npm run lint:fix
`

<br>

## Consume the API

I have created a route with documentation of API, this documentation are created with Swagger(OpenAPI) and show all methods of CRUD. You can test the API in this route: 

**/api-docs**


I created this route with documentation because I think that improve the experience with the API. In the future, is possible set an API_KEY or set another database to test the API.


<br>


### Use Postman

If you want to use Postman to do the CRUD, great! Follow the documentation in route before specified. 

To create a new phone and set the image, the method is POST and data must be established in the Body of request, even the file that save in server with *multer*. In the same way to UPDATE a phone. 


#### Filters

The API are prepared to filter data with query params in url, by example, if You want search by phone name, you must request with GET method to API and pass query param *name*:


`
http://localhost:9000/apiv1/phones/?name=iphone
`

Also is prepared to limit, skip or paginate the results, but for the moment, not return data (time, time and time).


<br>


## Considerations

You can Create, list, edit or delete a phone using API doc or Postman. In this case, I don't set a test suite because I implemented in front project.

I use multer to set file in server, but remains pending treat the image with *jimp* for example, to create miniatures with microservice like **Cote** or **RabbitMQ** (to heavy tasks).



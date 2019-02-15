# peter-capstone-server
[![Build Status](https://www.travis-ci.org/thinkful-ei27/peter-capstone-server.svg?branch=master)](https://www.travis-ci.org/thinkful-ei27/peter-capstone-server)

#### This is the backend API for my Tip Tracks 360 app. You can view the deployed version [here](https://tips-app-client.herokuapp.com/)
   - To read more about what the app actually does please visit the 
    [client-side github repository](https://github.com/thinkful-ei27/peter-capstone-client) for this app, and view the README.

### Technology Stack
This API is built with the power of node.js. It utilizes Express.js to set up and build the server and MongoDB for
data persistence. I am using mongoose.js to be the ORM layer of the server, so my server and DB can talk to eachother in
and easy manner. Mongoose takes care of a lot of the MongoDB quirks for us. I am using the Mocha and Chai frameworks for
testing.

This app is built in a RESTful architecture pattern as you can Create, Read, Update and Delete items.

This app has authentication set-up with [passport.js](http://www.passportjs.org/) and uses the bcrypt hashing algorithim
to securely hash and salt passwords for safe storage in my DB.

It also uses [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) or JWT's to allow the user to stay "authenticated" 
over a certain period (denotated in my config.js file) of time without having to log back in and go 
through the proccess of verifying their credentials (which entails a query to the DB) every-time they visit the
app. 

### Lay out of the code
File Tree:
<img width="416" alt="screen shot 2019-02-15 at 1 43 04 pm" src="https://user-images.githubusercontent.com/34561773/52877535-435afc80-3128-11e9-8de5-e0a3cf35248b.png">

#### Server and Routes
In server.js I have set up my initial server and connection to the DB server. With expressRouter, you can modularize your
routes code, and move it out of the server.js file. There is a couple lines of code that "mount" those routers onto my server,
within the server.js file. This allows for a nice clean server.js file. In the directories tips, jobs, users and auth, exists
those modularized routes (all called route.js)

#### Dummy Data and seed utility
The db directory contains some dummy data that I'm using to seed my DB to see if everything is working correctly with data in 
my development environment. The code for actually seeding the db lives in the utils/seed.js file

#### Authentication and JWT
The authorizarition code lives in the auth directory. In there are passport strategies, which basically define how the 
authorization process should work. There is also a router file in auth that define the enpoints for login and auth and the 
"refreshing" of JWT's.

#### Mongoose
The users, jobs and tips directories all have a models.js file that define the the Mongoose Schemas for each of those
particular collections. This Schema is like a blue print for how the data should look when it's in the DB

#### Tests
The test directory contains unit tests unsing Mocha and Chai for my different enpoints and my server.

### Developer Directions
To get started clone this repo down onto your machine and run `npm install` from the root directory of this project.
Before you start up the server you will need to make a `.env` file in the root directory and type in `JWT_SECRET=[YOUR SECRET
KEY HERE]`. You should be good to start the server now...To start up the server you can run `npm start` or `npm run dev`,
which will run nodemon (this allows you to make changes to the app without having to shut down and restart to server
everytime).


 

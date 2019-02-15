# peter-capstone-server
[![Build Status](https://www.travis-ci.org/thinkful-ei27/peter-capstone-server.svg?branch=master)](https://www.travis-ci.org/thinkful-ei27/peter-capstone-server)

#### This is the backend API for my Tip Tracks 360 app. You can view the deployed version [here](https://tips-app-client.herokuapp.com/)
   - To read more about what the app actually does please visit the 
    [client-side github repository](https://github.com/thinkful-ei27/peter-capstone-client) for this app, and view the README.

### Technology Stack
This API is built with the power of node.js. It utilizes Express.js to set up and build the server and MongoDB for data persistence.

This app is built in a RESTful architecture pattern as you can Create, Read, Update and Delete items.

This app has authentication set-up with [passport.js](http://www.passportjs.org/) and uses the bcrypt hashing algorithim
to securely hash and salt passwords for safe storage in my DB.

It also uses [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) or JWT's to allow the user to stay "authenticated" 
over a certain period (denotated in my config.js file) of time without having to re-authenticate every-time they visit the
app.

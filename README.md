# E-shopping-Cart
A sample shopping cart with Node js using express and Mongodb, This is my first experience in building a software all feedback are welcome.The site include every function for a normal E commerce should have.

Clone the project with git clone   
```npm install```   
cd app/   
make a configuration file  
example config.js on the root app/ structure
```
module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8000,
    URL: process.env.BASE_URL || 'http://localhost:8000',
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://<username> <password> /database name>"
}
```
and the import on server.js file
```
const config = require('./config');
```  
Run the server with    
* ```node server.js```
* ```nodemon server.js```

Added mongoDB database,get and post method route,tested for now with postman,client representation,client validation on test,contact page   
You can see the raw json from the database on /api and /api/contact   
Slowly refactoring the webapp's style with grid css3   [about page and test page]   


//Dependecy
const express = require('express');
const app = express();
const dotenv = require('dotenv');

//getting secret variables with dotenv
dotenv.config();


// Middleware
app.use(express.json()); //using json file on backend
app.use(express.urlencoded({ extended: false }));
app.use(require('./routes/route')) // using routes from routes file


//requireing mongodb connetion file
// require('./db/db');



// serving on localhost:5000
app.listen(process.env.PORT, () => console.log(`server is running on http://localhost:${process.env.PORT}`))
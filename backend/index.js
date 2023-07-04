//modules
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');



//middlewares
app.use(express.json()); //using json on express
app.use(express.urlencoded({ extended: false })); //don't know what
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"]
})); //using cors for not getting cors policy error



dotenv.config(); //using dotenv variables


require('./db/db'); //requireing database connetion 

app.use(require('./routes/route')); //using all routes


//starting server
app.listen(5000, () => console.log(`server is running on http://localhost:5000`));
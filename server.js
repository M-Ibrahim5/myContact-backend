const express = require("express");
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

// connect to database
connectDb();

const app = express();

const port = process.env.PORT || 5000;

//middleware for parsing string from client to server
app.use(express.json());
// middleware for express
app.use("/api/contacts", require("./routes/contactRoutes"));
// middleware for login/signup  users
app.use("/api/users", require("./routes/userRoutes"));
//use custom middleware that we created
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is running opn port ${port}`);
});
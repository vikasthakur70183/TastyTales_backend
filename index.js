const express = require('express');
const app = express();

require('dotenv').config();
const cors=require('cors');
var corsOptions = {
    origin: process.env.CORS,
    optionsSuccessStatus: 200 
  }
app.use(cors(corsOptions));

const connectToDatabase = require('./config/dbconfig');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const userRoutes = require('./Routes/userRoutes');
const recipeRoutes= require('./Routes/recipeRoutes')

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use('/', userRoutes);
app.use('/',recipeRoutes);

connectToDatabase()
  .then(() => {
    // Start the server only after successfully connecting to the database
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}` );
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
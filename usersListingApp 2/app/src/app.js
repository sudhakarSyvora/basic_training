const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
const authRoutes = require('./routes/AuthRoute'); 
const usersListRoutes=require('./routes/UsersListRoute')
const attachUser=require('./services/AuthService')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())

//db connect
const DB_URL = process.env.MONGO_URL;
  

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URL);

    console.log('Connected to MongoDB database!');
  
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

connectToDatabase();
 
app.use('/auth', authRoutes); 
app.use('/usersList',attachUser,usersListRoutes);

app.get('/',(req,res)=>res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/styles.css',(req,res)=>res.sendFile(path.join(__dirname, '../public/styles.css')));
app.get('/script.js',(req,res)=>res.sendFile(path.join(__dirname, '../public/script.js')));


function start() {
  const port = process.env.PORT || 5000;
  try{
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }catch(err){
    console.log(err)
  }

}

module.exports = {
  start,
};

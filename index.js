require("dotenv").config();    
const express = require("express");   

const db = require("./db/connect");                                           
const cors = require('cors');
const jwt = require ('jsonwebtoken');


const app = express(); 
const { mongoose } = require('mongoose');

db();


const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const customerRoutes = require('./routes/customerRoutes');
const bikeStation= require ('./routes/bikeStationRoutes')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my app!');
})

app.use('/auth', authRoutes);

//authentication
app.use("/",  (req,res,next) => {
    const token = req.headers.accesstoken
    if(!token){
      return res.status(400).send({msessage:"Token not found"})
    }
    return jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
        if(err){
          return next (createError({status:401,message:"InvalidToken"}));
        }
        req.user=decoded;
      return next();
      });
      
    })


app.use('/services', serviceRoutes);
app.use('/bookings', bookingRoutes);
app.use('/customers', customerRoutes);
app.use('/bike',bikeStation)






const PORT = process.env.PORT || 4000;



app.listen(PORT,()=>{                                                              
    console.log(`App is running on port ${PORT}`);
})
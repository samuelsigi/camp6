const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoutes  = require('./routes/auth-routes')
const bookroutes = require('./routes/book-routes');
const genreroutes = require('./routes/genre-routes')
const memberroutes = require('./routes/member-routes')
const rentalroutes = require('./routes/rental-routes')
const HttpError = require('./models/http-error')
const mongoose = require('mongoose')

const path = require('path');
const fs = require('fs');

app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads','images')))

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with,Content-type,Accept,Authorization');
  res.setHeader("Access-Control-Allow-Methods",
         "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
       );
   next();
  

})

app.use('/api/auth', authRoutes);

app.use('/api/books',bookroutes);
app.use('/api/genres',genreroutes);
app.use('/api/members',memberroutes);
app.use('/api/rentals',rentalroutes);



app.use((req,res,next)=>{
  const error = new HttpError('could not find this route',404);
  throw error;

});

app.use((err, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path,(err)=>{ 
      console.log(err);
    });
  }
    if(res.headerSent){
        return next(err)
    }
    res.status(err.code || 500);
    res.json({message: err.message} || 'An unkown error occured')
   
  })

  mongoose.connect('mongodb+srv://libinrockz21:1xFjv02guDFARAoQ@faith.l9ehq.mongodb.net/BookRentalSystem?retryWrites=true&w=majority&appName=faith').then(()=>{

  //to start the server 
  app.listen(5000);
  }).catch(err=>{
    console.log(err);
  })


const express = require('express');
const mongoose = require('mongoose');
const Meeting = require('./models/meeting');
const config = require('./config');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const app = express();

mongoose.connect("mongodb+srv://DatabaseUser:9916708968@cluster0.rymui.mongodb.net/zoomData?retryWrites=true&w=majority").then(()=>{
console.log("Connected to Database");
console.log("Token "+token)
})
.catch(()=>{
  console.log("Connection Failed Database");
});
const bodyParser= require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const payload = {
  iss: config.APIKey,
  exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");

  next();
})

app.post('/api/meetings',(req,res,next)=>{
  console.log("The body post "+JSON.stringify(req.body));
  var options = {
    //You can use a different uri if you're making an API call to a different Zoom endpoint.
    uri: "https://api.zoom.us/v2/users/ahetesum@bigcity.in/meetings",
    method: "POST",
    qs: {
        status: 'active'
    },
    auth: {
        'bearer': token
    },
    headers: {
        'User-Agent': 'Zoom-api-Jwt-Request',
        'content-type': 'application/json'
    },
    json: req.body //Parse the JSON string in the response
};

rp(options)
    .then(function (response) {
      //printing the response on the console

        console.log('Meeting Created', response);
        res.status(201).json({
          message:'Meeting Created Sucessfully'
        });
    })
    .catch(function (err) {
        // API call failed...
        console.log('API call failed, reason ', err);
    });

})



app.get('/api/meetings',(req,res,next)=>{

  console.log("get all meetings");
  var options = {
    //You can use a different uri if you're making an API call to a different Zoom endpoint.
    uri: "https://api.zoom.us/v2/users/me/meetings",
    method: 'GET',
    qs: {
        status: 'active'
    },
    auth: {
        'bearer': token
    },
    headers: {
        'User-Agent': 'Zoom-api-Jwt-Request',
        'content-type': 'application/json'
    },
    json: true //Parse the JSON string in the response
};

rp(options)
    .then(function (response) {
      //printing the response on the console
        console.log('List Meetings', response);
        res.status(201).json({
          message:'Meeting Fetched Sucessfully',
          meetings:response,
        });
    })
    .catch(function (err) {
        // API call failed...
        console.log('API call failed, reason ', err);
    });

});

app.delete('/api/meetings/:meetingId',(req,res,next)=>{
  var id = req.params.meetingId;
  console.log("Delete "+id);
  var options = {
    //You can use a different uri if you're making an API call to a different Zoom endpoint.
    uri: "https://api.zoom.us/v2/meetings/"+id,
    method: 'DELETE',
    qs: {
        status: 'active'
    },
    auth: {
        'bearer': token
    },
    headers: {
        'User-Agent': 'Zoom-api-Jwt-Request',
        'content-type': 'application/json'
    },
    json: true //Parse the JSON string in the response
};

rp(options)
    .then(function (response) {
      //printing the response on the console
        console.log('Delete', response);
        res.status(201).json({
          message:'Meeting Deleted Sucessfully',
        });
    })
    .catch(function (err) {
        // API call failed...
        console.log('API call failed, reason ', err);
    });

});

module.exports= app;

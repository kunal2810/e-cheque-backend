const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const routing = require('./routes/routing');
var cors=require("cors")

mongoose.connect(
    "mongodb://localhost:27017/eCheque",
    { useNewUrlParser: true }
  ).then(() => {
    console.log("Connected to MongoDB")})
  .catch(err => {
    console.log("Oops something went wrong", err)});
    
    const port = process.env.PORT || 5000;
    
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/',routing)

    app.listen(port, () => {
       console.log("Server listening on port " + port);
      });


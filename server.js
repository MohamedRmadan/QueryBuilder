const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config")

const appServer = express();

//users router file
const users = require("./routes/api/users");

//BodyParser middleware
appServer.use(bodyParser.json());

//DB Config
const db = config.get("mongoURI");
//Connect to mongo
mongoose.connect(db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// access static files in SERVER (photos)
appServer.use(express.static('./public'));

//use users router
appServer.use("/api/users", users);

//Start Server
const port = process.env.PORT || 5050;
appServer.listen(port);


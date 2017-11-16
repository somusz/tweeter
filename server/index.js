"use strict";

//requiring and launching resources
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//helper function for shutting down mongo database
let closeDb = function() {
  try {
    db.close();
  } catch (error) {
    throw error;
  } finally {
    process.exit();
  }
};

//connecting to mongo, requiring resources and listening to port
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    throw err;
  };

  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

//calling mongo shutdown on server shutdown
  process.on('SIGINT', closeDb);

});

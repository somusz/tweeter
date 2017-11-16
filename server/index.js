"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


MongoClient.connect(MONGODB_URI, function (err, db) {
  if (err) {
    throw err;
  }

  // let data = db.collection('tweets');

  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

  //db.close();

});


// MongoClient.connect(MONGODB_URI, (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }

//   console.log(`Connected to mongodb: ${MONGODB_URI}`);

//   function getTweets(callback) {
//     db.collection("tweets").find().toArray((err, tweets) => {
//       if (err) {
//         return callback(err);
//       }
//       callback(null, tweets);
//     });
//   }

//   getTweets((err, tweets) => {
//     if (err) throw err;

//     console.log("Logging each tweet:");
//     for (let tweet of tweets) {
//       console.log(tweet);
//     }

//     db.close();
//   });

// });

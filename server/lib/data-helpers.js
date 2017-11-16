"use strict";

module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: (newTweet, callback) => {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    getTweets: (callback) => {
      db.collection("tweets").find().toArray((err, results) => {
        if (err) {
          callback(err);
        }
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, results.sort(sortNewestFirst));
      });
    }
  };
}

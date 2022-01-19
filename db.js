const mongoose = require("mongoose");

const mongURI = process.env.DATABASE;

const connectingMongoose = () => {
  mongoose.connect(mongURI, () => {
    console.log("Connect to mongoose");
  });
};

module.exports = connectingMongoose;

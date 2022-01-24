const mongoose = require("mongoose");

const mongURI = 'mongodb+srv://AbdullahMotiWala:<password>@cluster0.4fz1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectingMongoose = () => {
  mongoose.connect(mongURI, () => {
    console.log("Connect to mongoose");
  });
};

module.exports = connectingMongoose;

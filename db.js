const mongoose = require("mongoose");

const mongURI ='mongodb+srv://AbdullahMotiWala:Bluebirds123@cluster0.4fz1u.mongodb.net/Cluster0?retryWrites=true&w=majority'

const connectingMongoose = () => {
  mongoose.connect(mongURI, () => {
    console.log("Connect to mongoose");
  });
};

module.exports = connectingMongoose;

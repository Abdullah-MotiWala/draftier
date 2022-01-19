const mongoose = require("mongoose");
// const { Schema } = mongoose;
const Schema = mongoose.Schema;

const NotesSch = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now()
  }
});
const Notes = mongoose.model("notes", NotesSch);
Notes.createIndexes();
module.exports = Notes;

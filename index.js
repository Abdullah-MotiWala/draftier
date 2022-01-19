if (process.env.NODE_ENV !== "production") {
    app.use(express.static("i_note_book/build"))
}
const dotEnv = require("dotenv").config({ path: "./config.env" });
const connectingMongoose = require("./db");
const express = require("express");
const cors = require("cors");

// const { Schema } = mongoose;

connectingMongoose();

const app = express();
const port = process.env.PORT || 5002;
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, (req, res) => {
  console.log("App is runnig");
});

const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const tokenMiddle = require("../middleWare/fetchUser");
const { body, validationResult } = require("express-validator");

//ROUTE 1: fetching notes of user login require
router.get("/fetchnotes", tokenMiddle, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//ROUTE 2: Adding notes of user login require
router.post(
  "/addnotes",
  tokenMiddle,
  [
    //validation
    body("title", "Title must be 5 character long").exists(),
    body("description", "Description must be 5 character long").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    //bad request on error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(res.json);
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //destructuring from request
      const { title, description, tags } = req.body;

      // saving notes to db
      const notes = new Notes({
        title,
        description,
        tags,
        user: req.user.id
      });

      const savedNote = await notes.save();
      res.json(savedNote);
    } catch (error) {
      res.send("Some Technical Error Occured");
      console.log({ error });
    }
  }
);

//ROUTE 3 update an existing note
router.put("/updatenotes/:id", tokenMiddle, async (req, res) => {
  try {
    const { eTitle, eDes, eTags } = req.body;
    console.log(req.body)
    //creating updating note
    let updNote = {};

    if (eTitle) {
      updNote.title = eTitle;
    }
    if (eDes) {
      updNote.description = eDes;
    }
    if (eTags) {
      updNote.tags = eTags;
    }
    //updating note
    let note = await Notes.findById(req.params.id);
    //verifications
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Not Authorized" });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updNote },
      { new: true }
    );
    let respond = res.json(note);
  } catch (error) {
    res.send("Some Technical Error Occured");
    console.log({ error });
  }
});

//ROUTE 4 Delete an existing note using id reteriving using params
router.delete("/deletenotes/:id", tokenMiddle, async (req, res) => {
  try {
    //deleting notes
    let note = await Notes.findById(req.params.id);
    //verification
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Not Authorized" });
    }
    //deleting notes
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ result: "Successfully deleted", note });
  } catch (error) {
    res.send("Some Technical Error Occured");
    res.send("Some Technical Error Occured");
    console.log({ error });
  }
});
module.exports = router;

import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

export const AddNotes = (props) => {
  const context = useContext(noteContext);
  const { addNotes } = context;
  const notesInitial = { title: "", description: "", tags: "" };

  const [notes, setNotes] = useState(notesInitial);

  const changeHandler = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="mb-3">
        <h4 className="my-4">Add Your Notes</h4>
        <label className="form-label">Note</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="At least five characters"

          name="title"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="At least five characters"
          name="description"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tags</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="add tags for conventions"
          name="tags"
          onChange={(e) => changeHandler(e)}
        />
        <button
          className="btn btn-primary my-4"
          onClick={() => {
            addNotes(notes);
          }}
          disabled={notes.title.length < 5 || notes.description.length < 5}
        >
          Add your notes
        </button>
      </div>
    </div>
  );
};

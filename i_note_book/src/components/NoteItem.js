import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { ediNotes, delNotes } = context;

  //note getting from parent (Notes) component in noteObj
  const { noteObj, updateNote } = props;
  return (
    <div className="card m-3 col-md-3 ">
      <div className="card-body">
        <h5 className="card-title">Title</h5>
        <p className="card-text">{noteObj.title}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{noteObj.description}</li>
        <li className="list-group-item">#{noteObj.tags}</li>
      </ul>
      <div className="card-body">
        <button
          className="btn btn-success m-2"
          onClick={() => updateNote(noteObj)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger m-2"
          onClick={() => delNotes(noteObj._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

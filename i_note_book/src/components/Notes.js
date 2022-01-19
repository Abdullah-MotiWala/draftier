import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { AddNotes } from "./AddNotes";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { curNotes, fetAllNotes, editNotes } = context;
  // fetching notes function
  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("login");
    } else {
      fetAllNotes();
    }
  }, []);
  const notesInitial = { id: "", etitle: "", edescription: "", etags: "" };
  const [notes, setNotes] = useState(notesInitial);
  const ref = useRef(null);
  const closeRef = useRef(null);
  const updateNote = (preNote) => {
    ref.current.click();
    setNotes({
      id: preNote._id,
      etitle: preNote.title,
      edescription: preNote.description,
      etags: preNote.tags
    });
  };
  const saveUpdNot = () => {
    editNotes(notes.id, notes.etitle, notes.edescription, notes.etags);
    closeRef.current.click();
  };

  const changeHandler = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNotes />
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Your Note
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* note foam modal */}
              <div className="mb-3">
                <label className="form-label">Note</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  name="etitle"
                  onChange={(e) => changeHandler(e)}
                  value={notes.etitle}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  name="edescription"
                  onChange={(e) => changeHandler(e)}
                  value={notes.edescription}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tags</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  name="etags"
                  onChange={(e) => changeHandler(e)}
                  value={notes.etags}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveUpdNot}
                disabled={
                  notes.etitle.length < 5 || notes.edescription.length < 5
                }
              >
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h4 className="my-4">Your Notes Here</h4>
      <div className="row">
        <div className="container">
          {curNotes.length === 0 && "Add notes to see here"}
        </div>

        {/* passing all notes of curNotes in noteobj prop  */}
        {curNotes.map((note, ind) => {
          return <NoteItem noteObj={note} key={ind} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
}

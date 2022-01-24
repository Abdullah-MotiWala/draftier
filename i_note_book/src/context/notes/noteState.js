import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [curNotes, setCurNotes] = useState([]);

  //fetch all notes on app start
  const fetAllNotes = async () => {
    let url = `/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
        Authorization: `Bearer ${token}`
      }
    });
    const fetchedNotes = await response.json();
    setCurNotes(fetchedNotes);
  };

  //addingNote
  const addNotes = async (noteAdd) => {
    const { title, description, tags } = noteAdd;

    // API Call for adding notes
    let url = `/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken")
      },
      body: JSON.stringify({ title, description, tags })
    });
    const note = await response.json();
    setCurNotes(curNotes.concat(note));
  };

  //deleting notes
  const delNotes = async (id) => {
    // API call for deleting notes using id as params
    let url = `/api/notes/deletenotes/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken")
      }
    });
    response.json(response);

    // logic for deleting notes
    const afterDel = curNotes.filter((noteObj) => {
      return noteObj._id !== id;
    });
    setCurNotes(afterDel);
  };

  //editing notes
  const editNotes = async (id, eTitle, eDes, eTags) => {
    console.time();
    //logic for editing notes
    let newNotes = JSON.parse(JSON.stringify(curNotes));
    console.log(newNotes);
    for (let i = 0; i < newNotes.length; i++) {
      let targetNote = curNotes[i];
      if (targetNote._id === id) {
        newNotes[i].title = eTitle;
        newNotes[i].description = eDes;
        newNotes[i].tags = eTags;
        break;
      }
    }
    setCurNotes(newNotes);
    // API call for editing notes
    let url = `/api/notes/updatenotes/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken")
      },
      body: JSON.stringify({ eTitle, eDes, eTags })
    });
    console.timeEnd();
  };
  return (
    <NoteContext.Provider
      value={{ curNotes, addNotes, delNotes, editNotes, fetAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

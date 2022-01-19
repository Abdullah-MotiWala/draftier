import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5002";
  const [curNotes, setCurNotes] = useState([]);

  //fetch all notes on app start
  const fetAllNotes = async () => {
    let url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken")
      }
    });
    const fetchedNotes = await response.json();
    setCurNotes(fetchedNotes);
  };

  //addingNote
  const addNotes = async (noteAdd) => {
    const { title, description, tags } = noteAdd;

    // API Call for adding notes
    let url = `${host}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken")
      },
      body: JSON.stringify({ title, description, tags })
    });
    // let noteRes = await response.json();
    // console.log(noteRes);/

    //logic for adding notes
    // const note = {
    //   _id: "61db0317274527889dcc4c27",
    //   user: "61d5fe7bcf8885f94ce563b2",
    //   title: title,
    //   description: description,
    //   tags: tags,
    //   time: "2022-01-09T15:45:20.373Z",
    //   __v: 0
    // };
    const note = await response.json()
    setCurNotes(curNotes.concat(note));
  };

  //deleting notes
  const delNotes = async (id) => {
    // API call for deleting notes using id as params
    let url = `${host}/api/notes/deletenotes/${id}`;
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
    let url = `${host}/api/notes/updatenotes/${id}`;
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

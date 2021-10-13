import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState(null);

  // Fetching the logidin user notes
  const getNote = async () => {
    let responce = await fetch(`${host}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    let json = await responce.json();
    setNotes(json);
  };

  // Adding notes
  const addNote = async (title, description) => {
    // eslint-disable-next-line
    let responce = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description }),
    });

    const note = {
      title: title,
      description: description,
    };
    setNotes(notes.concat(note));
  };

  // Deleting notes
  const deleteNote = async (_id) => {
    // eslint-disable-next-line
    let responce = await fetch(`${host}/api/notes/deletenote/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });

    let newNote = notes.filter((note) => {
      return note._id !== _id;
    });
    setNotes(newNote);
  };

  // Editing notes
  const editNote = async (_id, title, description) => {
    let responce = await fetch(`${host}/api/notes/updatenote/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description }),
    });
    // eslint-disable-next-line
    let json = responce.json();

    // eslint-disable-next-line
    const newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === _id) {
        newNote[index].title = title;
        newNote[index].description = description;
        break;
      }
    }
    setNotes(newNote);
  };

  const showAlert = (msg, type)=>{
    setAlert({
      msg: msg,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }


  return (
    <NoteContext.Provider
      value={{ notes, editNote, deleteNote, addNote, getNote, alert, showAlert }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

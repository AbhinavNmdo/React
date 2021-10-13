import React, { useContext, useState } from "react";
import NoteContext from "../context/Notes/NoteContext";

const Addnote = () => {
  const context = useContext(NoteContext);
  const { addNote, showAlert } = context;
  const [note, setNote] = useState({title: "", description: ""})
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description);
    const d = document.getElementById('description');
    const t = document.getElementById('title');
    d.value = "";
    t.value = "";
    showAlert("Added Successfully", "success")
  };

  const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  };
  return (
    <>
      <h1 className="my-4">iNoteBook</h1>
      <div className="card p-4 mb-5">
        <form style={{ width: "500px" }}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <strong>Title</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              min="1"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <strong>Description</strong>
            </label>
            <textarea
              className="form-control"
              id="description"
              onChange={handleChange}
              name="description"
            />
            <div id="emailHelp" className="form-text">
              Scroll to see your Notes
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Addnote;

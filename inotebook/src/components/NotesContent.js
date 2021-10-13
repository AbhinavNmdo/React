import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import NoteContext from "../context/Notes/NoteContext";
import NotesCards from "./NotesCards";

const NotesContent = () => {
  const context = useContext(NoteContext);
  const ref = useRef(null);
  const refClose = useRef(null);
  const { notes, getNote, editNote, showAlert } = context;
  const history = useHistory();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
    }
    else{
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({_id: "", etitle: "", edescription: ""})

  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({_id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description});
  }

  const handleClick = (e)=>{
    ref.current.click();
    editNote(note._id, note.etitle, note.edescription);
    e.preventDefault();
    showAlert("Updated Successfully", "success");
  }

  const handleChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    <strong>Title</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    min="1"
                    onChange={handleChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    <strong>Description</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    onChange={handleChange}
                    name="edescription"
                    value={note.edescription}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>




      <div className="row">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Your iNotes
        </h1>
        <div className="container">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NotesCards key={note._id} note={note} updateNote={updateNote}/>;
        })}
      </div>
    </>
  );
};

export default NotesContent;

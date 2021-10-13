import React, { useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";

const NotesCards = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote, showAlert } = context;
  const { note, updateNote } = props;
  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <div>
              <i
                className="fas fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  showAlert("Deleted Successfully", "success");
                }}
              ></i>
              <i
                className="fas fa-edit mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesCards;

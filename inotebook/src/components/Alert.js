import React, { useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";

const Alert = () => {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const {alert, showAlert} = context;
  const capitalize = (word)=>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1)
}
  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(alert.type)}: </strong>
          {alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;

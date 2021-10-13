import React from "react";
import Addnote from "./Addnote";
import NotesContent from "./NotesContent";

const Home = () => {
  return (
    <>
      <div
        className="container"
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginBottom: '40px'
        }}
      >
        <Addnote />
      </div>
      <div className="container" style={{ height: "90vh" }}>
        <NotesContent />
      </div>
    </>
  );
};

export default Home;

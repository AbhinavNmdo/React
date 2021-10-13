import React from "react";

function About(props) {
  let myStyle = {
    backgroundColor: props.mode==='dark'?'grey':'white',
    color: props.mode==='dark'?'white':'black',
    borderRadius: '25px'
  }
  return (
    <>
    <div className="container">
      <div Style="height: 60vh; width: 100%; display: flex; justify-content: center; align-item: center; margin-top: 90px;">
        <div className="card" style={myStyle} Style="width: 18rem; height: 18rem; border-radius: 25px;">
          <div className="card-body" style={myStyle}>
            <h5 className="card-title" align="center">About Me</h5>
            <p className="card-text" align="center" Style="margin-top: 50px">
              Hello! My name is Abhinav Namdeo, and I Tried my best to become a Web Dev, Software Dev, Android Dev.. Thank You.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default About;

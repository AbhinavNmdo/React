import React, { Component } from "react";
import loading from "./loading.gif";

export class Loading extends Component {
  render() {
    return (
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img className="text-center" src={loading} alt="loading" />
      </div>
    );
  }
}

export default Loading;

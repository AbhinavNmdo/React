import React from "react";
import loading from "./loading.gif";

const Loading = ()=> {
    return (
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img className="text-center" src={loading} alt="loading" />
      </div>
    );
}

export default Loading;

import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import NoteContext from "../context/Notes/NoteContext";

const Login = (props) => {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const {alert, showAlert} = context;
  const [credentials, setCredentials] = useState({email: "", password: ""})
  const history = useHistory();

  const submitLogin = async (e)=>{
    e.preventDefault();
    const responce = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    let json = await responce.json();
    if(json.success){
      localStorage.setItem('token', json.authToken_Login);
      history.push('/');
      showAlert("Logged In Successfully", "success");
    }
  };

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  return (
    <>
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <h1 className="p-3">Login</h1>

        <div className="card p-2" style={{ width: "20rem", height: "auto" }}>
          <form onSubmit={submitLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onChange}
                value={credentials.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={onChange}
                value={credentials.password}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

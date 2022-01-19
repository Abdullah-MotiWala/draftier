import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const url = `http://localhost:5002/api/auth/signup`;

export default function Signup() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const submitHanlder = async (e) => {
    e.preventDefault();
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    // storing json server repsonse auth token in local storage and navigating to home screen
    if (json.authToken) {
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
    //showing error of server if found
    else {
      alert((json.errors)[0].msg);
    }
  };
  return (
    <div>
      <form className="my-5" onSubmit={submitHanlder}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Full Name</label>
          <input
            autoComplete="user"
            type="text"
            className="form-control"
            id="exampleInputname"
            aria-describedby="nameHelp"
            placeholder="Enter Name"
            name="name"
            ref={nameRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            autoComplete="user"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            ref={emailRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            autoComplete="current-password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            ref={passwordRef}
          />
        </div>
        <div>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your details with anyone else.
          </small>
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Sign Up
        </button>
      </form>
    </div>
  );
}

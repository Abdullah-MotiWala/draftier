import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const url = `http://localhost:5002/api/auth/login`;

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submitHanlder = async (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    //using api for sign in
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    // storing json server repsonse auth token in local storage and navigating to home screen
    if (json.authToken) {
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
    //showing error of server if credential not found
    else {
      alert(json.error);
    }
  };
  return (
    <div>
      <form className="my-5" onSubmit={submitHanlder}>
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
        <button type="submit" className="btn btn-primary btn-outline my-2">
          Submit
        </button>
        Not Registered? <Link to={"/signup"}>Sign Up</Link>
      </form>
    </div>
  );
}

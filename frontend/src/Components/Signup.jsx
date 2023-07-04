import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//css
import "../CSS/Signup.css";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const navigate = useNavigate(); //navigate from react-router-dom to send user to login page

  //input useState
  const [allInput, setAllInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //handing all sign up input
  function handleInput(e) {
    let name = e.target.name,
      value = e.target.value;
    setAllInput({ ...allInput, [name]: value });
  }

  //submitting data to database
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", allInput)
      .then((res) => {
        alert("Sucessfully user created");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="signup">
      <form method="POST">
        <label>
          <div className="input">
            <FontAwesomeIcon className="signup-icon" icon={faUser} />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => handleInput(e)}
              value={allInput.name}
            />
          </div>
          <small>Name is required</small>
        </label>
        <label>
          <div className="input">
            <FontAwesomeIcon className="signup-icon" icon={faEnvelope} />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleInput(e)}
              value={allInput.email}
            />
          </div>
          <small className="emailErr">Email is required</small>
        </label>
        <label>
          <div className="input">
            <FontAwesomeIcon className="signup-icon" icon={faLock} />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleInput(e)}
              value={allInput.password}
            />
          </div>
          <small>Password is required</small>
        </label>
        <label>
          <div className="input">
            <FontAwesomeIcon className="signup-icon" icon={faKey} />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleInput(e)}
              value={allInput.confirmPassword}
            />
          </div>
          <small className="confirmPassErr">Confirm Password is required</small>
        </label>
        <button onClick={handleSubmit}>SIGN UP</button>
      </form>
      <p>
        Have A Account?
        <Link to={"/login"}>
          <span style={{ borderBottom: "1px solid blue", color: "blue" }}>
            {" "}
            Login
          </span>
        </Link>
      </p>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
  async function handleSumbit(e) {
    e.preventDefault();
    const req = await axios.post("http://localhost:5000/signup", allInput);
    const data = req.data;
    console.log(data);
  }

  return (
    <div className="signup">
      <form onSubmit={(e) => handleSumbit(e)}>
        <label>
          <FontAwesomeIcon className="signup-icon" icon={faUser} />
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleInput(e)}
            value={allInput.name}
          />
        </label>
        <label>
          <FontAwesomeIcon className="signup-icon" icon={faEnvelope} />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleInput(e)}
            value={allInput.email}
          />
        </label>
        <label>
          <FontAwesomeIcon className="signup-icon" icon={faLock} />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleInput(e)}
            value={allInput.password}
          />
        </label>
        <label>
          <FontAwesomeIcon className="signup-icon" icon={faKey} />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleInput(e)}
            value={allInput.confirmPassword}
          />
        </label>
        <button>SIGN UP</button>
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

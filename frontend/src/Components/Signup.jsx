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
  const [otp, setOtp] = useState(false);
  const [otpJWT, setOtpJwt] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState("");

  //handing all sign up input
  function handleInput(e) {
    let name = e.target.name,
      value = e.target.value;
    setAllInput({ ...allInput, [name]: value });
  }

  //email verification with otp
  function handleVerification() {
    if (allInput.password !== allInput.confirmPassword)
      return alert("password and confirm password dosen't match");
    const data = { email: allInput.email };
    axios
      .post("http://localhost:5000/signup/otp", data)
      .then((res) => {
        console.log(res);
        if (res.data.status === "ok") {
          setOtp(true);
          setOtpJwt(res.data.otp);
          alert(res.data.message);
        } else if (res.data.status == "failed") {
          alert(res.data.message);
        }
      })
      .catch((err) => alert(err));
  }

  //submitting data to database
  function handleSubmit() {
    const data = {
      name: allInput.name,
      password: allInput.password,
      otp: oneTimePassword,
      token: otpJWT,
      email: allInput.email,
    };
    axios
      .post("http://localhost:5000/signup", data)
      .then((res) => {
        console.log(res);
        if (res.data.status === "failed") {
          return alert(res.data.message);
        } else if (res.data.status === "ok") {
          alert(res.data.message);
          navigate("/login");
        } else {
          alert("something went wrong");
        }
      })
      .catch((err) => alert(err));
  }

  return (
    <div className="signup">
      <div className="form">
        {otp ? (
          <>
            <label>
              <div className="input">
                <FontAwesomeIcon className="signup-icon" icon={faUser} />
                <input
                  type="number"
                  placeholder="Enter OTP"
                  onChange={(e) => setOneTimePassword(e.target.value)}
                />
              </div>
              <small>Name is required</small>
            </label>
          </>
        ) : (
          <>
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
              <small className="confirmPassErr">
                Confirm Password is required
              </small>
            </label>
          </>
        )}
        <button onClick={otp ? handleSubmit : handleVerification}>
          {otp ? "SIGN UP" : "NEXT"}
        </button>
      </div>
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

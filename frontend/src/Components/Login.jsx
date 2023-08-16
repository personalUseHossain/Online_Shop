import React, { useContext, useState } from "react";
import Cookies from "universal-cookie"; //cookie to set cookies of login
import { useNavigate } from "react-router-dom"; //router
import "../CSS/Login.css"; //css
import axios from "axios"; //for making request to backend
import { Context } from "../App"; //getting context from app.jsx

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Login() {
  const cookies = new Cookies(); //for saving cookies
  const navigate = useNavigate(); //to navigate user to diffenent pages

  //Context
  const { online_shop_cookies, set_online_shop_cookies } = useContext(Context);
  console.log(online_shop_cookies);
  //email and password input useState
  const [allInput, setAllInput] = useState({
    email: "",
    password: "",
  });
  //checkbox (remember me ) input useState
  const [sendJwt, setSendJwt] = useState(false);

  //handle email and password input
  function handleInput(e) {
    let name = e.target.name,
      value = e.target.value;
    setAllInput({ ...allInput, [name]: value });
  }

  //login post request
  async function handleSubmit(e) {
    e.preventDefault();
    if (allInput.email === "" || allInput.password === "") {
      alert("Input fields can't be empty");
      return;
    }

    try {
      const req = await axios.post("http://localhost:5000/login", {
        allInput,
        sendJwt,
      });

      const data = req.data;

      if (data.error) {
        alert(data.error);
      } else if (data.token) {
        const newCookies = {
          ...online_shop_cookies,
          userData: data.findUser,
          login_token: data.token,
        };
        set_online_shop_cookies(newCookies);
        const cookie_expires_date = new Date();
        cookie_expires_date.setMonth(cookie_expires_date.getMonth() + 1);
        cookies.set("online_shop_cookies", newCookies, { cookie_expires_date });

        if (data.findUser.admin) {
          alert("Welcome admin");
        } else {
          alert("Successfully logged in");
        }

        navigate("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while logging in.");
    }
  }

  return (
    <div className="login">
      <form>
        <label className="email">
          <FontAwesomeIcon className="login-icon" icon={faUser} />
          <input
            className="emailInput"
            type="email"
            placeholder="Email"
            value={allInput.email}
            onChange={handleInput}
            name="email"
          />
        </label>
        <label className="password">
          <FontAwesomeIcon className="login-icon" icon={faLock} />
          <input
            type="password"
            placeholder="Password"
            value={allInput.password}
            onChange={handleInput}
            name="password"
          />
        </label>
        <label className="remember">
          <input type="checkbox" onChange={() => setSendJwt(!sendJwt)} />
          Remember me
        </label>
        <button onClick={handleSubmit}>SIGN IN</button>
      </form>
      <p>
        Not a member?
        <Link to={"/signup"}>
          <span style={{ borderBottom: "1px solid blue", color: "blue" }}>
            {" "}
            Sign up now
          </span>
        </Link>
      </p>
    </div>
  );
}

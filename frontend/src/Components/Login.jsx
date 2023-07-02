import React from "react";

//css
import "../CSS/Login.css";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login">
      <form>
        <label>
          <FontAwesomeIcon className="login-icon" icon={faUser} />
          <input type="email" placeholder="Email" />
        </label>
        <label>
          <FontAwesomeIcon className="login-icon" icon={faLock} />
          <input type="password" placeholder="Password" />
        </label>
        <button>SIGN IN</button>
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

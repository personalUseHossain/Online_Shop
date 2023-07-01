import React, { useState } from "react";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";

// importing css
import "../CSS/Navbar.css";

export default function Navbar() {
  // useState hooks
  const [toggleIcon, setToggleIcon] = useState(faBarsStaggered);

  return (
    <div className="navbar">
      <div className="logo">
        <img src="../public/Img/Logo.png" alt="Logo" />
        <FontAwesomeIcon icon={toggleIcon} />
      </div>
      <div className="nav-icon">
        <input type="text" placeholder="Search for products..." />
        <select name="cateogry" value="All Cateogries">
          <option value="Electronics">Electronics</option>
          <option value="Makeup">Makeup</option>
          <option value="Dress">Dress</option>
        </select>
      </div>
      <div className="user">
        <button>Login</button>
        <button>Signup</button>
      </div>
    </div>
  );
}

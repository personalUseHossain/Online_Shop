import React, { useRef, useState } from "react";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faXmark,
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faHeart,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

// importing css
import "../CSS/Navbar.css";

export default function Navbar() {
  // useState hooks
  const [toggleIcon, setToggleIcon] = useState(faBarsStaggered); //toggle menu icon

  // useRef hooks
  const menu = useRef(null); //sidebar section

  // functions

  //handling sidebar toggle
  function handleMenuToggle() {
    if (toggleIcon === faBarsStaggered) {
      setToggleIcon(faXmark); //changing toggle icon to xmark
      menu.current.style.left = "0";
    } else {
      setToggleIcon(faBarsStaggered); //changing toggle icon to bars
      menu.current.style.left = "-10rem";
    }
  }

  //showing search menu when click on search icon on small deivce
  function handleSearch() {
    document.querySelector(".navbar").style.display = "none";
    document.querySelector(".small_input").style.display = "flex";
  }

  function closeSearch() {
    document.querySelector(".navbar").style.display = "grid";
    document.querySelector(".small_input").style.display = "none";
  }

  return (
    <>
      <div className="small_input">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="small_input_icon"
          onClick={closeSearch}
        />
        <input type="text" placeholder="Search for products..." />
        <FontAwesomeIcon
          onClick={handleSearch}
          className="small_input_icon"
          icon={faMagnifyingGlass}
        />
      </div>
      <div className="navbar">
        <div className="menu" ref={menu}>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Blogs</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="logo">
          <FontAwesomeIcon
            className="toggleMenu"
            onClick={handleMenuToggle}
            icon={toggleIcon}
          />
          <img src="../public/Img/Logo.png" alt="Logo" />
        </div>
        <div className="nav-search">
          <input type="text" placeholder="Search for products..." />
          <FontAwesomeIcon
            onClick={handleSearch}
            className="nav-search-icon"
            icon={faMagnifyingGlass}
          />
        </div>
        <div className="user">
          <div className="account">
            <FontAwesomeIcon className="user-icon account" icon={faUser} />
            <div>
              <small>Sign In</small>
              <h5>Account</h5>
            </div>
          </div>
          <FontAwesomeIcon className="user-icon account small" icon={faUser} />
          <FontAwesomeIcon
            className="user-icon cart small"
            icon={faCartShopping}
          />
          <div className="cart">
            <FontAwesomeIcon className="user-icon cart" icon={faCartShopping} />
            <div>
              <small>Total</small>
              <h5>$0.00</h5>
            </div>
          </div>
          <div className="love">
            <FontAwesomeIcon className="user-icon" icon={faHeart} />
            <small className="love-counter">0</small>
          </div>
        </div>
      </div>
    </>
  );
}

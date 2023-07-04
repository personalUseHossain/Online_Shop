import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; //react router dom
import "../CSS/Navbar.css"; // importing css
import { Context } from "../App"; //getting context from app.jsx

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
  faHouse,
  faCouch,
  faBlog,
  faAddressBook,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

export default function Navbar() {
  const cookies = new Cookies(); //cookies
  const navigate = useNavigate();

  useEffect(() => {}, []);

  // useState hooks
  const [toggleIcon, setToggleIcon] = useState(faBarsStaggered); //toggle menu icon
  const [showUserInfo, setShowUserInfo] = useState(false); //show user info on navbar user icon

  // useRef hooks
  const menu = useRef(null); //sidebar section

  //context api
  const { isLogin, userData } = useContext(Context);

  // functions

  //toggling side bar when click anywhere
  document.addEventListener("click", (e) => {
    if (toggleIcon === faXmark) {
      if (e.target.id !== "menu" && e.target.id !== "toggleIcon") {
        setToggleIcon(faBarsStaggered); //changing toggle icon to bars
        menu.current.style.width = "5rem";
        document.body.classList.remove("body");
        setShowUserInfo(false);
      }
    } else return;
  });

  //handling sidebar toggle
  function handleMenuToggle() {
    if (toggleIcon === faBarsStaggered) {
      setToggleIcon(faXmark); //changing toggle icon to xmark
      menu.current.style.width = "13rem";
      document.body.classList.add("body");
    } else {
      setToggleIcon(faBarsStaggered); //changing toggle icon to bars
      menu.current.style.width = "5rem";
      document.body.classList.remove("body");
    }
  }

  //showing search menu when click on search icon on small deivce
  function handleSearch() {
    document.querySelector(".navbar").style.display = "none";
    document.querySelector(".small_input").style.display = "flex";
  }
  //close search menu when click to back button
  function closeSearch() {
    document.querySelector(".navbar").style.display = "grid";
    document.querySelector(".small_input").style.display = "none";
  }
  //show user info
  function handleShowUserInfo() {}

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
        <div className="menu" id="menu" ref={menu}>
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon className="menu-icon" icon={faHouse} />
                Home
              </Link>
            </li>
            <li>
              <Link to="/">
                <FontAwesomeIcon className="menu-icon" icon={faCouch} />
                Products
              </Link>
            </li>
            <li>
              <Link to="/">
                <FontAwesomeIcon className="menu-icon" icon={faBlog} />
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/">
                <FontAwesomeIcon className="menu-icon" icon={faAddressCard} />
                About
              </Link>
            </li>
            <li>
              <Link to="/">
                <FontAwesomeIcon className="menu-icon" icon={faAddressBook} />
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="logo">
          <FontAwesomeIcon
            id="toggleIcon"
            className="toggleMenu"
            onClick={handleMenuToggle}
            icon={toggleIcon}
          />
          <Link to={"/"}>
            <img src="../public/Img/Logo.png" alt="Logo" />
          </Link>
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
          {!isLogin ? (
            <>
              <Link to={"/login"}>
                <div className="account">
                  <FontAwesomeIcon
                    className="user-icon account"
                    icon={faUser}
                  />
                  <div className="account-txt">
                    <small>Sign In</small>
                    <h5>Account</h5>
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <div className="login-account">
                <FontAwesomeIcon
                  onClick={() => setShowUserInfo(!showUserInfo)}
                  className="user-icon account"
                  icon={faUser}
                />
                <h6>{userData.name}</h6>
                <div
                  className="account-info"
                  style={{ display: showUserInfo ? "flex" : "none" }}
                >
                  <FontAwesomeIcon
                    onClick={() => setShowUserInfo(false)}
                    className="xmark"
                    icon={faXmark}
                  />
                  <FontAwesomeIcon
                    className="user-icon account"
                    icon={faUser}
                  />
                  <h3>{userData.name}</h3>
                  <small>{userData.email}</small>
                  <button>Update Profile</button>
                  <button
                    onClick={() => {
                      cookies.remove("login_token");
                      alert("Logged out");
                      location.reload();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}

          <Link to={"/cart"}>
            <FontAwesomeIcon
              className="user-icon cart small"
              icon={faCartShopping}
            />
            <div className="cart">
              <FontAwesomeIcon
                className="user-icon cart"
                icon={faCartShopping}
              />
              <div>
                <small>Total</small>
                <h5>$0.00</h5>
              </div>
            </div>
          </Link>
          <div className="love">
            <FontAwesomeIcon className="user-icon" icon={faHeart} />
            <small className="love-counter">0</small>
          </div>
        </div>
      </div>
    </>
  );
}

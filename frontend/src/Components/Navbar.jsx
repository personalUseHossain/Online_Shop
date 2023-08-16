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
  faChartPie,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

export default function Navbar() {
  const cookies = new Cookies(); //cookies
  const navigate = useNavigate();

  // useState hooks
  const [toggleIcon, setToggleIcon] = useState(faBarsStaggered); //toggle menu icon
  const [showUserInfo, setShowUserInfo] = useState(false); //show user info on navbar user icon

  // useRef hooks
  const menu = useRef(null); //sidebar section

  //getting login, admin and user information from cookies which has been set up when login
  const { login_token, userData, admin } =
    cookies.get("online_shop_cookies") || {};
  const isLogin = login_token ? true : false;

  // functions

  //toggling side bar when click anywhere
  document.addEventListener("click", (e) => {
    if (toggleIcon === faXmark) {
      if (e.target.id !== "menu" && e.target.id !== "toggleIcon") {
        setToggleIcon(faBarsStaggered); //changing toggle icon to bars
        menu.current.style.width = "5rem";
        document.body.classList.remove("body");
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
            {userData && userData.admin && (
              <>
                <li>
                  <Link to="/dashboard">
                    <FontAwesomeIcon className="menu-icon" icon={faChartPie} />
                    DashBoard
                  </Link>
                </li>
                <li>
                  <Link to="/insert/product">
                    <FontAwesomeIcon className="menu-icon" icon={faCartPlus} />
                    New
                  </Link>
                </li>
              </>
            )}
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
              <div
                className="login-account"
                onClick={() => {
                  setShowUserInfo(!showUserInfo);
                }}
              >
                {!userData.img && (
                  <>
                    <FontAwesomeIcon
                      className="user-icon account"
                      icon={faUser}
                    />
                  </>
                )}
                <img
                  className="user-icon account"
                  src={`http://localhost:5000/public/${userData.img}`}
                  alt=""
                />
                <h6>{userData.name}</h6>
                <div
                  className="account-info"
                  style={{ display: showUserInfo ? "grid" : "none" }}
                >
                  <FontAwesomeIcon
                    onClick={() => setShowUserInfo(false)}
                    className="xmark"
                    icon={faXmark}
                  />

                  {!userData.img && (
                    <>
                      <FontAwesomeIcon
                        className="user-icon account"
                        icon={faUser}
                      />
                    </>
                  )}
                  <img
                    className="user-icon account"
                    src={`http://localhost:5000/public/${userData.img}`}
                    alt=""
                  />

                  <h3>{userData.name}</h3>
                  <small>{userData.email}</small>
                  {userData.admin && (
                    <p style={{ marginLeft: "20px" }}>Welcome Back Admin</p>
                  )}
                  <Link to={"/update/userinfo"}>
                    <button>Update</button>
                  </Link>
                  <button
                    onClick={() => {
                      cookies.remove("online_shop_cookies");
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

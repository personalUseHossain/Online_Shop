import React, { useRef, useState } from "react";

//react router dom
import { Link } from "react-router-dom";

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

// importing css
import "../CSS/Navbar.css";

export default function Navbar() {
  // useState hooks
  const [toggleIcon, setToggleIcon] = useState(faBarsStaggered); //toggle menu icon
  const [showUser, setShowUser] = useState(false);

  // useRef hooks
  const menu = useRef(null); //sidebar section

  // functions

  //handling sidebar toggle
  function handleMenuToggle() {
    if (toggleIcon === faBarsStaggered) {
      setToggleIcon(faXmark); //changing toggle icon to xmark
      menu.current.style.width = "13rem";
    } else {
      setToggleIcon(faBarsStaggered); //changing toggle icon to bars
      menu.current.style.width = "5rem";
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
        <div className="menu" ref={menu}>
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
          <div className="account" onClick={() => setShowUser(!showUser)}>
            <FontAwesomeIcon className="user-icon account" icon={faUser} />
            <div className="account-txt">
              <small>Sign In</small>
              <h5>Account</h5>
            </div>
            {showUser && (
              <>
                <div className="user-info">
                  <FontAwesomeIcon icon={faXmark} />
                  <Link to={"/login"}>
                    <button>Login</button>
                  </Link>
                  <Link to={"/signup"}>
                    <button>Sing up</button>
                  </Link>
                </div>
              </>
            )}
          </div>

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

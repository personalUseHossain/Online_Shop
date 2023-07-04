import React, { createContext, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom"; //router
import "./CSS/Universal.css"; // importing universal css
import Cookies from "universal-cookie";

// importing all components
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

export const Context = createContext();
function App() {
  const cookies = new Cookies();
  const [isLogin, setIsLogin] = useState(
    cookies.get("login_token") === undefined ? false : true
  ); //for check if user is logged in or not
  const [userData, setUserData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(cookies.get("isAdmin") || false);
  return (
    <>
      <Context.Provider
        value={{
          isLogin,
          setIsLogin,
          userData,
          setUserData,
          isAdmin,
          setIsAdmin,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/cart" Component={Cart}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/signup" Component={Signup}></Route>
        </Routes>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;

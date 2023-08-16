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
import UpdateUserInfo from "./Components/UpdateUserInfo";
import Dashboard from "./Components/Admin/Dashboard";
import InsertProduct from "./Components/Admin/InsertProduct";

export const Context = createContext();
function App() {
  const cookies = new Cookies();
  // const [isLogin, setIsLogin] = useState(
  //   cookies.get("login_token") === undefined ? false : true
  // ); //for check if user is logged in or not
  const [online_shop_cookies, set_online_shop_cookies] = useState(
    cookies.get("online_shop_cookies") || {}
  );
  console.log(online_shop_cookies);
  // const [userData, setUserData] = online_shop_cookies.jwt || [];
  // const [isAdmin, setIsAdmin] = online_shop_cookies.isAdmin || false;
  return (
    <>
      <Context.Provider
        value={{
          online_shop_cookies,
          set_online_shop_cookies,
        }}
      >
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/cart" Component={Cart}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/signup" Component={Signup}></Route>
            <Route path="/update/userinfo" Component={UpdateUserInfo}></Route>
            <Route path="/dashboard" Component={Dashboard}></Route>
            <Route path="/insert/product" Component={InsertProduct}></Route>
          </Routes>
        </div>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;

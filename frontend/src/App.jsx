import React from "react";

//router
import { Route, Routes } from "react-router-dom";

// importing universal css
import "./CSS/Universal.css";

// importing all components
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/cart" Component={Cart}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/signup" Component={Signup}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

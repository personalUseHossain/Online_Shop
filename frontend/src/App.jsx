import React from "react";

// importing universal css
import "./CSS/Universal.css";

// importing all components
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;

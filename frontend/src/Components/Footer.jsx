import React from "react";

export default function Footer() {
  const style = {
    backgroundColor: "whitesmoke",
    height: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="footer-container">
      <div className="footer" style={style}>
        <p>Made by Hossain</p>
      </div>
    </div>
  );
}

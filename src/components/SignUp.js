import React, { useState } from "react";
import google from "../assets/googleIcon.png";
import divider from "../assets/Divider.png";

export default function SignUp(props) {
  const [newUser, setNewUser] = useState({ newEmail: "", newPwd: "" });
  function handleInput(e) {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="signup-modal">
      <i
        className="fa-solid fa-x"
        onClick={() => {
          props.toggleModal();
        }}
      ></i>
      <h2>Sign Up</h2>
      <label htmlFor="newEmail">New email</label>
      <input
        type="email"
        id="newEmail"
        name="newEmail"
        onChange={(e) => {
          handleInput(e);
        }}
        value={newUser.newEmail}
      />
      <label htmlFor="newPwd">New password</label>
      <input
        type="pwd"
        id="newPwd"
        name="newPwd"
        onChange={(e) => {
          handleInput(e);
        }}
        value={newUser.newPwd}
      />
      <button className="signup-btn">Sign Up</button>
      <img src={divider} alt="divider" className="divider" />
      <button className="google-btn">
        <img src={google} alt="google icon" /> Continue with Google
      </button>
    </div>
  );
}

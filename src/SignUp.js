import React, { useState } from "react";
import google from "./assets/googleIcon.png";
import divider from "./assets/Divider.png";
import { app } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp(props) {
  let auth = getAuth();
  const [newUser, setNewUser] = useState({ newEmail: "", newPwd: "" });
  function handleInput(e) {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function handleSubmit() {
    createUserWithEmailAndPassword(auth, newUser.newEmail, newUser.newPwd)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
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
      <button
        className="signup-btn"
        onClick={() => {
          handleSubmit();
        }}
      >
        Sign Up
      </button>
      <img src={divider} alt="divider" className="divider" />
      <button className="google-btn">
        <img src={google} alt="google icon" /> Continue with Google
      </button>
    </div>
  );
}

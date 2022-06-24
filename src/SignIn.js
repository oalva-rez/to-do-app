import React, { useState } from "react";
import logo from "./assets/logo.png";
import google from "./assets/googleIcon.png";
import divider from "./assets/Divider.png";
import SignUp from "./SignUp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const [userInput, setUserInput] = useState({ email: "", pwd: "" });
  const [signUpModal, setSignUpModal] = useState(false);
  function toggleModal() {
    setSignUpModal((prev) => !prev);
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
    <>
      {signUpModal ? <SignUp toggleModal={toggleModal} /> : null}
      <div className="signin--wrapper">
        <div className="signin--hero">
          <div className="hero--logo">
            <img src={logo} alt="logo" />
            <h1>Bingota</h1>
          </div>
          <h2 className="hero--heading">Keep track of your tasks.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            earum repellat obcaecati hic voluptatem quasi facere quaerat
            laudantium dignissimos dolorem? Eum deleniti veniam unde ex!
          </p>
        </div>
        <div className="signin--detail">
          <div className="google-signin">
            <h2>Sign in</h2>
            <button className="google-btn">
              <img src={google} alt="google icon" /> Continue with Google
            </button>
          </div>
          <img src={divider} alt="divider" className="divider" />
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="username-email" className="inp-label">
              User name or email address
            </label>
            <input type="text" id="email" name="email" />
            <label htmlFor="pwd" className="inp-label">
              Your password
            </label>
            <input type="password" name="pwd" id="pwd" />
            <button className="forget-pwd">Forget your password</button>
            <button className="signin-btn">Sign in</button>
            <p className="new-user">
              Don't have an account?
              <button
                className="new-user-btn"
                onClick={() => {
                  toggleModal();
                }}
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

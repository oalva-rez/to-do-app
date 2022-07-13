import React from "react";

export default function Greeting(props) {
  const today = new Date();
  const curHr = today.getHours();
  let mainGreeting;
  let subGreeting;

  if (curHr < 12) {
    mainGreeting = "Good Morning";
    subGreeting = "Hope you have a wonderful morning!";
  } else if (curHr < 18) {
    mainGreeting = "Good Afternoon";
    subGreeting = "Lunch time yet?";
  } else {
    mainGreeting = "Good Evening";
    subGreeting = "A nights rest for a better tomorrow.";
  }

  return (
    <>
      <div className="greeting">
        <div className="greeting--headings">
          <h1>{mainGreeting} </h1>
          <h2>{subGreeting}</h2>
        </div>
        <div className="user-signout">
          <button className="signout-btn">Sign Out</button>
        </div>
      </div>
    </>
  );
}

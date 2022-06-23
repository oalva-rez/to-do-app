import React from "react";

export default function Greeting() {
  const today = new Date();
  const curHr = today.getHours();
  let greeting;

  if (curHr < 12) {
    greeting = (
      <div className="greeting">
        <h1>Good Morning,</h1>
        <h2>Hope you have a wonderful day.</h2>
      </div>
    );
  } else if (curHr < 18) {
    greeting = (
      <div className="greeting">
        <h1>Good Afternoon,</h1>
        <h2>Lunch time yet?</h2>
      </div>
    );
  } else {
    greeting = (
      <div className="greeting">
        <h1>Good Evening,</h1>
        <h2>The moon looks beautiful tonight.</h2>
      </div>
    );
  }

  return <>{greeting}</>;
}

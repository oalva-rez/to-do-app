import React from "react";
import isToday from "date-fns/isToday";
import parseISO from "date-fns/parseISO";

export default function Tasks(props) {
  if (props.selectedFilter.filter === "Home") {
    return (
      <ul>
        {props.tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <div>{task.date}</div>
          </li>
        ))}
      </ul>
    );
  } else if (props.selectedFilter.filter === "Today") {
    let todayTasks = props.tasks.filter((task) => isToday(parseISO(task.date)));
    console.log(props.projects);
    return (
      <ul>
        {todayTasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <div>{task.date}</div>
          </li>
        ))}
      </ul>
    );
  }
}

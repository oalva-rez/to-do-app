import React from "react";
import isToday from "date-fns/isToday";
import parseISO from "date-fns/parseISO";

export default function Tasks(props) {
  const allProjTasks = [];
  props.projects.forEach((proj) =>
    proj.tasks.forEach((task) => allProjTasks.push(task))
  );
  const allTasks = [...props.tasks, ...allProjTasks];

  if (props.selectedFilter.filter === "Home") {
    return (
      <ul>
        {allTasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <div>{task.date}</div>
          </li>
        ))}
      </ul>
    );
  } else if (props.selectedFilter.filter === "Today") {
    let todayTasks = allTasks.filter((task) => isToday(parseISO(task.date)));

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

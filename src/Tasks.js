import React from "react";
import isToday from "date-fns/isToday";
import parseISO from "date-fns/parseISO";
import addDays from "date-fns/addDays";
import isBefore from "date-fns/isBefore";

export default function Tasks(props) {
  let tasksToRender = [];

  if (props.selectedFilter.filter === "Home") {
    tasksToRender = props.tasks;
  } else if (props.selectedFilter.filter === "Today") {
    tasksToRender = props.tasks.filter((task) => isToday(parseISO(task.date)));
  } else if (props.selectedFilter.filter === "Week") {
    let weekFromToday = addDays(new Date(), 7);
    tasksToRender = props.tasks.filter((task) =>
      isBefore(parseISO(task.date), weekFromToday)
    );
  } else {
    const allSelectedProjTasks = [];
    props.tasks.forEach((task) => {
      if (task.projectId === props.selectedFilter.projectId) {
        allSelectedProjTasks.push(task);
      }
    });
    tasksToRender = allSelectedProjTasks;
  }
  return (
    <ul>
      {tasksToRender.map((task) => (
        <li key={task.id}>
          {task.title}
          <div>{task.date}</div>
          <div
            // why is it passing both arguments with only one (e) parameter???
            onClick={(e) => {
              props.deleteTask(e, task);
            }}
          >
            X
          </div>
        </li>
      ))}
    </ul>
  );
}

import React from "react";
import isToday from "date-fns/isToday";
import parseISO from "date-fns/parseISO";
import addDays from "date-fns/addDays";
import isBefore from "date-fns/isBefore";
import checked from "./assets/checked.png";
import unchecked from "./assets/unchecked.png";

export default function Tasks(props) {
  let tasksToRender = [];

  if (props.selectedFilter.filter === "Home") {
    //render all tasks
    tasksToRender = props.tasks;
  } else if (props.selectedFilter.filter === "Today") {
    // render tasks due today
    tasksToRender = props.tasks.filter((task) => isToday(parseISO(task.date)));
  } else if (props.selectedFilter.filter === "Week") {
    // render tasks due a week from now
    let weekFromToday = addDays(new Date(), 7);
    tasksToRender = props.tasks.filter((task) =>
      isBefore(parseISO(task.date), weekFromToday)
    );
  } else {
    // render the selected projects task
    const allSelectedProjTasks = [];
    props.tasks.forEach((task) => {
      if (task.projectId === props.selectedFilter.projectId) {
        allSelectedProjTasks.push(task);
      }
    });
    tasksToRender = allSelectedProjTasks;
  }
  function dateFormat(date) {
    if (date === "") {
      return;
    } else {
      const oldDate = date.split("-");
      const newDate = `${oldDate[1]}/${oldDate[2]}/${oldDate[0]}`;
      return newDate;
    }
  }
  return (
    <ul className="tasks--list">
      {tasksToRender.map((task) => (
        <li
          key={task.id}
          className="tasks--item"
          onClick={(e) => {
            props.selectTask(e, task);
          }}
        >
          {task.isCompleted ? (
            <img
              src={checked}
              alt="checked mark"
              onClick={() => {
                props.completeTask(task);
              }}
            />
          ) : (
            <img
              src={unchecked}
              alt="unchecked mark"
              onClick={() => {
                props.completeTask(task);
              }}
            />
          )}
          {task.title}
          <div>{dateFormat(task.date)}</div>
          <i
            className="fa-solid fa-trash-can"
            // why is it passing both arguments with only one (e) parameter???
            onClick={(e) => {
              props.deleteTask(e, task);
            }}
          ></i>
        </li>
      ))}
    </ul>
  );
}

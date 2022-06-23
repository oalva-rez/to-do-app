import React from "react";
import isToday from "date-fns/isToday";
import parseISO from "date-fns/parseISO";
import addDays from "date-fns/addDays";
import isBefore from "date-fns/isBefore";

export default function Tasks(props) {
  const allProjTasks = [];
  props.projects.forEach((proj) =>
    proj.tasks.forEach((task) => allProjTasks.push(task))
  );
  const allTasks = [...props.tasks, ...allProjTasks];
  let tasksToRender;

  if (props.selectedFilter.filter === "Home") {
    tasksToRender = allTasks;
  } else if (props.selectedFilter.filter === "Today") {
    let todayTasks = allTasks.filter((task) => isToday(parseISO(task.date)));
    tasksToRender = todayTasks;
  } else if (props.selectedFilter.filter === "Week") {
    let weekFromToday = addDays(new Date(), 7);
    let weekTasks = allTasks.filter((task) =>
      isBefore(parseISO(task.date), weekFromToday)
    );
    tasksToRender = weekTasks;
  } else {
    const allSelectedProjTasks = [];
    props.projects.forEach((proj) => {
      if (proj.id === props.selectedFilter.projectId) {
        allSelectedProjTasks.push(...proj.tasks);
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

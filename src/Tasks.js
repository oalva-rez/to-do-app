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
    console.log(parseISO("2022-06-15"));
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
  } else if (props.selectedFilter.filter === "Week") {
    let weekFromToday = addDays(new Date(), 7);
    let weekTasks = allTasks.filter((task) =>
      isBefore(parseISO(task.date), weekFromToday)
    );

    return (
      <ul>
        {weekTasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <div>{task.date}</div>
          </li>
        ))}
      </ul>
    );
  } else {
    const allSelectedProjTasks = [];
    props.projects.forEach((proj) => {
      if (proj.id === props.selectedFilter.projectId) {
        allSelectedProjTasks.push(...proj.tasks);
      }
    });

    return (
      <ul>
        {allSelectedProjTasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <div>{task.date}</div>
          </li>
        ))}
      </ul>
    );
  }
}

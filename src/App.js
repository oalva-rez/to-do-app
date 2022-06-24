import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";
import Greeting from "./Greeting";
import { nanoid } from "nanoid";
import add from "./assets/add.png";
import logo from "./assets/logo.png";

export default function App() {
  const [inputData, setInputData] = useState({
    task: "",
    date: "",
    project: "",
  });
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [toggleAddProject, setToggleAddProject] = useState(false);
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    filter: "Home",
    projectId: null,
  });
  const selectedStyle = {
    backgroundColor: "#ffcdb4",
    borderRight: "7px solid #FD7B38",
    transition: "background-color, 250ms",
    transitionTimingFunction: "ease-in-out",
  };
  const unselectedStyle = {
    backgroundColor: "#FFFFFF",
    transition: "background-color, 250ms",
    transitionTimingFunction: "ease-in",
  };
  console.log(JSON.parse(localStorage.getItem("tasks")));
  useEffect(() => {
    setInputData({
      task: "",
      date: "",
      project: "",
    });
  }, [tasks, projects]);

  function addProject() {
    setToggleAddProject(false);
    let pId = nanoid();
    setProjects((prev) => {
      return [
        {
          name: inputData.project,
          id: pId,
        },
        ...prev,
      ];
    });
    // select project that was just added
    setSelectedFilter({ filter: inputData.project, projectId: pId });
  }
  function deleteProject(e, proj) {
    e.stopPropagation();
    setProjects((prev) => {
      return prev.filter((p) => proj.id !== p.id);
    });
    setTasks((prev) => {
      return prev.filter((t) => proj.id !== t.projectId);
    });
    setSelectedFilter({ filter: "Home", projectId: null });
  }

  function deleteTask(e, task) {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => task.id !== t.id));
  }
  function completeTask(task) {
    setTasks((prev) =>
      prev.map((prevTask) => {
        return prevTask.id === task.id
          ? { ...prevTask, isCompleted: !prevTask.isCompleted }
          : { ...prevTask };
      })
    );
  }
  function addTask() {
    setToggleAddTask(false);
    // if project is selected, add task with selected project id
    if (selectedFilter.projectId) {
      setTasks((prev) => {
        return [
          {
            title: inputData.task,
            date: inputData.date,
            id: nanoid(),
            projectId: selectedFilter.projectId,
            isCompleted: false,
          },
          ...prev,
        ];
      });
      // if no project selected add task to all tasks with null project
    } else {
      setTasks((prev) => {
        return [
          {
            title: inputData.task,
            date: inputData.date,
            id: nanoid(),
            projectId: null,
            isCompleted: false,
          },
          ...prev,
        ];
      });
    }
  }
  function handleChange(e) {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  }
  return (
    <>
      <aside>
        <h1>
          <img src={logo} alt="logo" />
          Bingota
        </h1>
        <div className="filters">
          <button
            onClick={() =>
              setSelectedFilter({ filter: "Home", projectId: null })
            }
            style={
              selectedFilter.filter === "Home" ? selectedStyle : unselectedStyle
            }
          >
            <i className="fa-solid fa-house"></i>
            <p>HOME</p>
          </button>
          <button
            onClick={() =>
              setSelectedFilter({ filter: "Today", projectId: null })
            }
            style={
              selectedFilter.filter === "Today"
                ? selectedStyle
                : unselectedStyle
            }
          >
            <i className="fa-solid fa-calendar-day"></i>
            <p>TODAY</p>
          </button>
          <button
            onClick={() =>
              setSelectedFilter({ filter: "Week", projectId: null })
            }
            style={
              selectedFilter.filter === "Week" ? selectedStyle : unselectedStyle
            }
          >
            <i className="fa-solid fa-calendar-week"></i>
            <p>WEEK</p>
          </button>
        </div>

        <div className="project--container">
          <div className="project--header">
            <h2>Projects</h2>
            {!toggleAddProject && (
              <img
                className="add"
                onClick={() => {
                  setToggleAddProject(true);
                }}
                src={add}
                alt="add project"
              />
            )}
          </div>
          {toggleAddProject && (
            <div className="project--new-proj">
              <input
                type="text"
                placeholder="Project name"
                id="project"
                onChange={(e) => handleChange(e)}
                value={inputData.project}
              />
              <div className="project--btns">
                <button onClick={() => addProject()}>Add</button>
                <button onClick={() => setToggleAddProject(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
          <ul className="project--list">
            {projects.map((proj) => (
              <li
                className="project--item"
                key={proj.id}
                onClick={() => {
                  setSelectedFilter({ filter: proj.name, projectId: proj.id });
                }}
                style={
                  selectedFilter.projectId === proj.id
                    ? selectedStyle
                    : unselectedStyle
                }
              >
                {proj.name}

                <i
                  className="fa-solid fa-trash-can proj-delete"
                  onClick={(e) => {
                    deleteProject(e, proj);
                  }}
                ></i>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main>
        <Greeting />
        <div className="tasks--container">
          <div className="tasks--header">
            <h2>{selectedFilter.filter}</h2>
            {!toggleAddTask && (
              <img
                className="add"
                onClick={() => {
                  setToggleAddTask(true);
                }}
                src={add}
                alt="add task"
              />
            )}
          </div>
          {
            <Tasks
              selectedFilter={selectedFilter}
              tasks={tasks}
              projects={projects}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          }
          {toggleAddTask && (
            <div className="tasks--new-task">
              <div className="tasks--inputs">
                <input
                  type="text"
                  placeholder="Task name"
                  id="task"
                  name="task"
                  onChange={(e) => handleChange(e)}
                  value={inputData.task}
                />
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={inputData.date}
                />
              </div>
              <div className="tasks--btns">
                <button onClick={() => addTask()}>Add</button>
                <button onClick={() => setToggleAddTask(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

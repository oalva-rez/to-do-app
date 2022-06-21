import React, { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState({
    tasks: [],
    task: "",
  });
  const [projects, setProjects] = useState({
    projects: [],
    project: "",
  });
  const [toggleAddProject, setToggleAddProject] = useState(false);
  const [toggleAddTask, setToggleAddTask] = useState(false);

  function addProject() {
    setToggleAddProject(false);
    setProjects((prev) => {
      return {
        ...prev,
        projects: [
          ...prev.projects,
          {
            name: projects.project,
          },
        ],
      };
    });
  }
  function handleChange(e) {
    if (e.target.id === "project") {
      setProjects((prev) => {
        return {
          ...prev,
          project: e.target.value,
        };
      });
    } else if (e.target.id === "task") {
      setTasks((prev) => {
        return {
          ...prev,
          task: e.target.value,
        };
      });
    }
  }
  console.log(projects);
  return (
    <>
      <aside>
        <h1>ToDo Mio</h1>
        <div className="filters">
          <button>Home</button>
          <button>Today</button>
          <button>Week</button>
        </div>
        {toggleAddProject && (
          <div className="new-project">
            <input
              type="text"
              placeholder="Project name"
              id="project"
              onChange={(e) => handleChange(e)}
            />
            <div className="proj-btns">
              <button onClick={() => addProject()}>Add</button>
              <button onClick={() => setToggleAddProject(false)}>Cancel</button>
            </div>
          </div>
        )}
        {!toggleAddProject && (
          <div
            className="add-proj-btn"
            onClick={() => {
              setToggleAddProject(true);
            }}
          >
            + Add Project
          </div>
        )}
      </aside>
      <main></main>
    </>
  );
}

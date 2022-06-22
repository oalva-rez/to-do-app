import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";
import { nanoid } from "nanoid";

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
  useEffect(() => {
    setInputData({
      task: "",
      date: "",
      project: "",
    });
  }, [tasks, projects]);

  function addProject() {
    setToggleAddProject(false);
    setProjects((prev) => {
      return [
        {
          name: inputData.project,
          id: nanoid(),
          tasks: [],
        },
        ...prev,
      ];
    });
  }
  function addTask() {
    setToggleAddTask(false);
    if (selectedFilter.projectId) {
      //   map through projects if id matches selectedId get all tasks
    } else {
      setTasks((prev) => {
        return [
          {
            title: inputData.task,
            date: inputData.date,
            id: nanoid(),
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
  console.log(inputData);
  return (
    <>
      <aside>
        <h1>ToDo Mio</h1>
        <div className="filters">
          <button
            onClick={() =>
              setSelectedFilter({ filter: "Home", projectId: null })
            }
          >
            Home
          </button>
          <button
            onClick={() =>
              setSelectedFilter({ filter: "Today", projectId: null })
            }
          >
            Today
          </button>
          <button
            onClick={() =>
              setSelectedFilter({ filter: "Week", projectId: null })
            }
          >
            Week
          </button>
        </div>
        {toggleAddProject && (
          <div className="new-project">
            <input
              type="text"
              placeholder="Project name"
              id="project"
              onChange={(e) => handleChange(e)}
              value={inputData.project}
            />
            <div className="proj-btns">
              <button onClick={() => addProject()}>Add</button>
              <button onClick={() => setToggleAddProject(false)}>Cancel</button>
            </div>
          </div>
        )}

        {projects.map((proj) => (
          <li
            key={proj.id}
            onClick={() => {
              setSelectedFilter({ filter: proj.name, projectId: proj.id });
            }}
          >
            {proj.name}
          </li>
        ))}

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
      <main>
        <div className="tasks-header">
          <h2>{selectedFilter.filter}</h2>
          <h3>Date:</h3>
        </div>
        {
          <Tasks
            selectedFilter={selectedFilter}
            tasks={tasks}
            projects={projects}
          />
        }
        {toggleAddTask && (
          <div className="new-task">
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
            <div className="task-btns">
              <button onClick={() => addTask()}>Add</button>
              <button onClick={() => setToggleAddTask(false)}>Cancel</button>
            </div>
          </div>
        )}
        {!toggleAddTask && (
          <div
            className="add-task-btn"
            onClick={() => {
              setToggleAddTask(true);
            }}
          >
            + Add Task
          </div>
        )}
      </main>
    </>
  );
}

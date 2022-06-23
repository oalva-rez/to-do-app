import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";
import { nanoid } from "nanoid";
import add from "./assets/add.png";

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
  }

  function deleteTask(e, task) {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => task.id !== t.id));
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
        <ul>
          {projects.map((proj) => (
            <li
              key={proj.id}
              onClick={() => {
                setSelectedFilter({ filter: proj.name, projectId: proj.id });
              }}
            >
              {proj.name}
              <div
                className="proj-delete"
                onClick={(e) => {
                  deleteProject(e, proj);
                }}
              >
                X
              </div>
            </li>
          ))}
        </ul>
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

        {!toggleAddProject && (
          <div className="add-proj">
            <h2>Projects</h2>
            <img
              className="add-proj-btn"
              onClick={() => {
                setToggleAddProject(true);
              }}
              src={add}
              alt="add project"
            />
          </div>
        )}
      </aside>
      <main>
        <div className="tasks-header">
          <h2>{selectedFilter.filter}</h2>
          {!toggleAddTask && (
            <img
              className="add-task-btn"
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
      </main>
    </>
  );
}

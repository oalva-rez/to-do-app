import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

import Tasks from "./components/Tasks/Tasks";
import Greeting from "./components/Greeting/Greeting";
import SignIn from "./components/SignIn/SignIn";
import { nanoid } from "nanoid";
import add from "./assets/add.png";
import logo from "./assets/logo.png";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [toggleAddProject, setToggleAddProject] = useState(false);
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    filter: "Home",
    projectId: null,
  });
  const [inputData, setInputData] = useState({
    task: "",
    date: "",
    project: "",
  });
  const [userInfo, setUserInfo] = useState({
    uId: false,
    name: null,
    image: "http://www.gravatar.com/avatar/?d=identicon",
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
  function authStateObserver(user) {
    if (user) {
      setUserInfo((prev) => {
        return { uId: user.uid, name: user.displayName, image: user.photoURL };
      });
    } else {
      setUserInfo((prev) => {
        return { ...prev, uId: false };
      });
    }
  }
  function initFirebaseAuth() {
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  // init auth observer
  useEffect(() => {
    const firebaseAppConfig = getFirebaseConfig();
    initializeApp(firebaseAppConfig);
    initFirebaseAuth();
  }, []);

  // load user tasks and projects
  useEffect(() => {
    const colRef = collection(getFirestore(), "users");
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === userInfo.uId) {
          setTasks(doc.data().tasks);
          setProjects(doc.data().projects);
        }
      });
    });
  }, [userInfo.uId]);

  // save user todo and projects to db
  useEffect(() => {
    async function saveTodo() {
      try {
        if (tasks.length > 0) {
          await setDoc(doc(getFirestore(), "users", userInfo.uId), {
            tasks,
            projects,
            name: userInfo.name,
            uId: userInfo.uId,
            createdAt: serverTimestamp(),
          });
        }
      } catch (error) {
        console.log("Error writing new todo to Firebase Database", error);
      }
    }

    saveTodo();
    setInputData({
      task: "",
      date: "",
      project: "",
    });
  }, [tasks, projects]);

  async function handleSignIn() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    setUserInfo((prev) => {
      return {
        ...prev,
        uId: getAuth().currentUser.uid,
        name: getAuth().currentUser.displayName,
        image: getAuth().currentUser.photoURL,
      };
    });
  }
  function handleSignOut() {
    signOut(getAuth());
    setUserInfo((prev) => {
      return {
        ...prev,
        uId: false,
      };
    });
    setTasks([]);
    setProjects([]);
  }
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
      {!userInfo.uId ? (
        <SignIn handleSignIn={handleSignIn} />
      ) : (
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
                  selectedFilter.filter === "Home"
                    ? selectedStyle
                    : unselectedStyle
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
                  selectedFilter.filter === "Week"
                    ? selectedStyle
                    : unselectedStyle
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
                      setSelectedFilter({
                        filter: proj.name,
                        projectId: proj.id,
                      });
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
            <Greeting handleSignOut={handleSignOut} userInfo={userInfo} />
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
                    <button onClick={() => setToggleAddTask(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}

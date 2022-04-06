import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  const baseUrl = "http://localhost:5000/tasks";

 //we get with fetch

  // const fetchTasks = async () =>{
  // try{
  // const res = await fetch(baseUrl);
  // const data = await res.json();
  // setTasks(data);}
  // catch(err){
  //   console.log(err);
  // }
  // };

  //we get with axios
  const fetchTasks = async () => {
    const {data} = await axios.get(baseUrl);
    setTasks(data);
  }
  useEffect(() => {
    fetchTasks();
  }, []);
  
 
  // ADD TASK
  // const addTask = (newTask) => {
  //   const id = Math.floor(Math.random() * 1000 + 1);
  //   const addNewTask = { id, ...newTask };
  //   setTasks([...tasks, addNewTask]);
  // };
  const addTask = async (newTask)=>{
    await axios.post(baseUrl, newTask);
    fetchTasks();
  }

  // DELETE TASK
  const deleteTask = async(deletedTaskId) =>{
    await axios.delete(`${baseUrl}/${deletedTaskId}`);
    fetchTasks();
  }

  // const deleteTask = (deletedTaskId) => {
  //   // console.log("delete Task", deletedTaskId);
  //   setTasks(tasks.filter((task) => task.id !== deletedTaskId));
  // };

  // TOGGLE DONE
const toggleDone = async(toggleDoneId)=>{
  const {data} = await axios.get(`${baseUrl}/${toggleDoneId}`);
  const updatedTask = {...data, isDone: !data.isDone};
  await axios.put(`${baseUrl}/${toggleDoneId}`, updatedTask);
  //await axios.patch(`${baseUrl}/${toggleDoneId}`, {isDone:!data.isDone});
  fetchTasks();
}

  // const toggleDone = (toggleDoneId) => {
  //   // console.log("double click", toggleDoneId);
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === toggleDoneId ? { ...task, isDone: !task.isDone } : task
  //     )
  //   );
  // };

  // TOGGLESHOW
  const toggleShow = () => setShowAddTask(!showAddTask);

  return (
    <div className="container">
      <Header
        title="TASK TRACKER"
        showAddTask={showAddTask}
        toggleShow={toggleShow}
      />

      {showAddTask && <AddTask addTask={addTask} />}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} deleteTask={deleteTask} toggleDone={toggleDone} />
      ) : (
        <h2 style={{ textAlign: "center" }}>NO TASK TO SHOW</h2>
      )}
    </div>
  );
}

export default App;

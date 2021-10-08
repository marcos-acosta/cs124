import React from 'react';
import ReactDOM from 'react-dom';
import InMemoryApp from './Components/InMemoryApp';
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

let initialData = [
  {
    taskName: "an incredibly wordy task; that is to say, a task with an egregious number of words",
    isCompleted: false,
    id: generateUniqueID(),
  },
  {
    taskName: "feed rock",
    isCompleted: false,
    id: generateUniqueID(),
  },
  {
    taskName: "water plant",
    isCompleted: true,
    id: generateUniqueID(),
  },
  {
    taskName: "water sidewalk",
    isCompleted: true,
    id: generateUniqueID(),
  }
];

function setTaskProperty(id, field, value) {
  initialData.find(task => task.id === id)[field] = value;
  render();
}

function deleteTask(id) {
  initialData = initialData.filter(task => task.id !== id);
  render();
}

function clearCompleted() {
  initialData = initialData.filter(task => !task.isCompleted);
  render();
}

function addTask() {
  const id = generateUniqueID();
  let newTask = {
    taskName: "",
    isCompleted: false,
    id: id
  }
  initialData = [...initialData, newTask];
  render();
  return id;
}

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <InMemoryApp  data={initialData} 
                    setTaskProperty={setTaskProperty}
                    deleteTask={deleteTask}
                    clearCompleted={clearCompleted}
                    addTask={addTask} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();
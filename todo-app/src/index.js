import React from 'react';
import ReactDOM from 'react-dom';
import InMemoryApp from './Components/InMemoryApp';

let initialData = [
  {
    taskName: "buy new john grisham book",
    isCompleted: false,
    id: "0",
  },
  {
    taskName: "feed rock",
    isCompleted: false,
    id: "1",
  },
  {
    taskName: "water plant",
    isCompleted: true,
    id: "2",
  },
  {
    taskName: "water sidewalk",
    isCompleted: true,
    id: "3",
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

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <InMemoryApp  data={initialData} 
                    setTaskProperty={setTaskProperty}
                    deleteTask={deleteTask}
                    clearCompleted={clearCompleted} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();
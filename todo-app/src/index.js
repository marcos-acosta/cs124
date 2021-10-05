import React from 'react';
import ReactDOM from 'react-dom';
import InMemoryApp from './Components/InMemoryApp';

let initialData = [
  {
    taskName: "buy new john grisham book",
    isCompleted: false,
    id: 0,
  },
  {
    taskName: "feed rock",
    isCompleted: false,
    id: 1,
  },
  {
    taskName: "water plant",
    isCompleted: true,
    id: 2,
  },
  {
    taskName: "water sidewalk",
    isCompleted: true,
    id: 3,
  }
]

ReactDOM.render(
  <React.StrictMode>
    <InMemoryApp initialData={initialData} />
  </React.StrictMode>,
  document.getElementById('root')
);

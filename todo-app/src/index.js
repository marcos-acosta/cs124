import React from 'react';
import ReactDOM from 'react-dom';
import InMemoryApp from './Components/InMemoryApp';

let initialData = [
  {
    taskName: "buy new john grisham book",
    isCompleted: false,
  },
  {
    taskName: "feed rock",
    isCompleted: false,
  },
  {
    taskName: "water plant",
    isCompleted: true,
  }
]

ReactDOM.render(
  <React.StrictMode>
    <InMemoryApp initialData={initialData} />
  </React.StrictMode>,
  document.getElementById('root')
);

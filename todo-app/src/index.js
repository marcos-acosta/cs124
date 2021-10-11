import React from 'react';
import ReactDOM from 'react-dom';
import InMemoryApp from './Components/InMemoryApp';
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

let initialData = [
  {
    taskName: "an incredibly wordy task; that is to say, a task with an egregious number of words. an incredibly wordy task; that is to say, a task with an egregious number of words",
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

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <InMemoryApp  initialData={initialData} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();
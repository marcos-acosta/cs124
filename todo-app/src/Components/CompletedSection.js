import { useState } from 'react'
import './CompletedSection.css'
import TaskList from './TaskList'

export default function CompletedSection(props) {
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  function handleClear() {
    setShouldFadeOut(true);
    setTimeout(() => props.clearCompleted(), 500);
  }

  return (
    <div className={`completedSectionContainer ${shouldFadeOut ? 'invisible' : ''}`}>
      <div id="completedItemsHeader">
        <h3>
          completed
          <button id="clearCompleted" onClick={handleClear}>clear</button>
        </h3>
      </div>
      <TaskList tasks={props.tasks} 
        setTaskProperty={props.setTaskProperty} 
        deleteTask={props.deleteTask} />
    </div>
  )
}
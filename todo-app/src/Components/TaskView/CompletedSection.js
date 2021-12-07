import { useState } from 'react'
import './CompletedSection.css'
import TaskList from './TaskList'

export default function CompletedSection(props) {
  const [startDisappearing, setstartDisappearing] = useState(false);

  function handleClear() {
    setstartDisappearing(true);
    setTimeout(() => props.deleteCompleted(), 500);
  }

  return (
    <div className={`completedSectionContainer ${startDisappearing ? 'invisible' : ''}`}>
      <div className="completedItemsHeader">
        <h3>
          completed
          <button className="clearCompleted" onClick={handleClear} aria-label={`delete completed tasks. tasks to be completed: ${props.tasks.map(task => task.taskName).join()}`}>clear</button>
        </h3>
      </div>
      <TaskList tasks={props.tasks} 
        setTaskProperty={props.setTaskProperty} 
        deleteTask={props.deleteTask} />
    </div>
  )
}
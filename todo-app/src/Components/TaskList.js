import Task from './TaskItem';
import { useState } from 'react';

export default function TaskList(props) {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleExpandedTaskId = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  }

  return (
    <div>
      {
        props.tasks.map(taskItem => 
          <Task {...taskItem} 
                key={taskItem.id} 
                expandedTaskId={expandedTaskId}
                expandTaskCallback={toggleExpandedTaskId}/>)
      }
    </div>
  )
}
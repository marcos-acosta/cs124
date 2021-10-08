import TaskItem from './TaskItem';
import { useState } from 'react';

export default function TaskList(props) {
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [taskInEditModeId, setTaskInEditModeId] = useState(null);

  const toggleExpandedTaskId = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  }

  return (
    <div>
      {
        props.tasks.map(taskItem => 
          <TaskItem {...taskItem} 
                key={taskItem.id} 
                expandedTaskId={expandedTaskId}
                expandTaskCallback={toggleExpandedTaskId}
                setTaskProperty={props.setTaskProperty}
                deleteTask={props.deleteTask}
                setTaskInEditModeId={setTaskInEditModeId}
                clearTaskInEditMode={() => setTaskInEditModeId(null)}
                taskInEditModeId={taskInEditModeId} />)
      }
    </div>
  )
}
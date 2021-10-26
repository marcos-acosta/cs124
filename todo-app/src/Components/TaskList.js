import TaskItem from './TaskItem';
import "./TaskList.css";

export default function TaskList(props) {

  return (
    <div className="taskListDiv">
      {
        props.tasks.map(taskItem => 
          <TaskItem {...taskItem} 
                key={taskItem.id} 
                expandedTaskId={props.expandedTaskId}
                expandTaskCallback={props.toggleExpandedTaskId}
                setTaskProperty={props.setTaskProperty}
                deleteTask={props.deleteTask}
                setTaskInEditModeId={props.setTaskInEditModeId}
                taskInEditModeId={props.taskInEditModeId} />)
      }
    </div>
  )
}
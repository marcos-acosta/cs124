import Task from './TaskItem';

export default function TaskList(props) {
  return (
    <div>
      {
        props.tasks.map(taskItem => <Task {...taskItem} key={taskItem.id} />)
      }
    </div>
  )
}
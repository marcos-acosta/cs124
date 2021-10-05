import './TaskItem.css';

export default function TaskItem(props) {

  return (
    <div className="toDoItem">
      <div className="toDoItemInline">
        <input type="checkbox" id={`label-${props.id}`} />
        <label id={`label-${props.id}`} className={props.isCompleted ? "strikethrough" : ""}>
          {props.taskName}
        </label>
        {!props.isCompleted && <button  className={`toDoItemMoreOptions ${props.expandedTaskId === props.id ? "selected" : ""}`}
                                        onClick={() => props.expandTaskCallback(props.id)}>
          ᐳ
        </button>}
      </div>
      {
        props.expandedTaskId === props.id &&
        <div className="toDoItemOptions">
          <button className="editButton toDoItemActionButton"> edit </button>
          <button className="deleteButton toDoItemActionButton"> delete </button>
        </div>
      }
    </div>
  )
}
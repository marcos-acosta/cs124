import './TaskItem.css';

export default function TaskItem(props) {

  return (
    <div className="toDoItem">
        <div className="toDoCheckbox">
          <input type="checkbox" id={`label-${props.id}`} />
        </div>
        <div className="toDoLabel">
          <label id={`label-${props.id}`} className={props.isCompleted ? "strikethrough" : ""}>
            {props.taskName}
          </label>
        </div>
        {!props.isCompleted && 
          <div className="toDoOptions">
            <div  className={`toDoDropdown ${props.expandedTaskId === props.id ? "selected" : ""}`}
                                        onClick={() => props.expandTaskCallback(props.id)}>
              <div className={`optionsArrow ${props.expandedTaskId === props.id ? "rotated" : ""}`}>➔</div>
            </div>
          </div>}
      {
        props.expandedTaskId === props.id &&
        <>
          <div className="toDoLowerHalf" />
          <div className="toDoItemOptions">
            <button className="editButton toDoItemActionButton"> edit </button>
            <button className="deleteButton toDoItemActionButton"> delete </button>
          </div>
        </>
      }
    </div>
  )
}
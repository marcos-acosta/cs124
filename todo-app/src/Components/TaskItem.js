import './TaskItem.css';

export default function TaskItem(props) {

  return (
    <div className="toDoItem">
        <div className="toDoCheckbox">
          <input  type="checkbox" 
                  id={`label-${props.id}`} 
                  checked={props.isCompleted} 
                  onChange={e => props.setTaskProperty(props.id, 'isCompleted', e.target.checked)}/>
        </div>
        <div className="toDoLabel">
          { props.taskInEditModeId === props.id
            ? <input 
                value={props.taskName} 
                onChange={e => props.setTaskProperty(props.id, 'taskName', e.target.value)}
                onKeyUp={e => {if (e.key === 'Enter') props.clearTaskInEditMode()}} />
            : <label id={`label-${props.id}`} className={props.isCompleted ? "strikethrough" : ""}>
                {props.taskName}
              </label>
          }
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
            <button className={`editButton toDoItemActionButton ${props.taskInEditModeId === props.id ? 'grayText' : ''}`} onClick={() => props.setTaskInEditModeId(props.id)}> edit </button>
            <button className={`deleteButton toDoItemActionButton ${props.taskInEditModeId === props.id ? 'grayText' : ''}`} onClick={() => props.deleteTask(props.id)}> delete </button>
          </div>
        </>
      }
    </div>
  )
}
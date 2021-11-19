import "./TaskItemOptions.css"

const PRIORITIES = [1, 2, 3];
const PRIORITY_TO_TEXT = ["low", "medium", "high"];

export default function TaskItemOptions(props) {
  const inEditMode = props.taskInEditModeId === props.id;

  const priorityToButton = (priority, index) => {
    return  <button className={`priorityButton ${props.priority === priority ? `whiteText selectedPriority` : ''}`}
                    onClick={() => props.handleChangePriority(priority)}
                    key={index}
                    aria-label={`${props.priority === priority ? "deselect" : "select"} priority level for task ${props.taskName} to ${PRIORITY_TO_TEXT[priority - 1]}`}>
                      {'!'.repeat(priority)}
            </button>
  }

  return <>
    <div className="toDoLowerHalf" />
    <div className="toDoItemOptions">
      <button className={`editButton toDoItemActionButton ${ inEditMode ? 'grayText' : ''}`} 
              onClick={props.onClickEditButton}
              aria-label={`edit task name: ${props.taskName}`}>
                edit
      </button>
      <button className={`deleteButton toDoItemActionButton ${inEditMode ? 'grayText' : ''}`}
              onClick={() => props.handleDeletion()}
              aria-label={`delete task: ${props.taskName}`}>
                delete
      </button>
      <div />
      {
        PRIORITIES.map((p, index) => priorityToButton(p, index))
      }
    </div>
  </>
}
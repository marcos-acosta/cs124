import "./TaskItemOptions.css"

const PRIORITIES = [1, 2, 3];
const PRIORITY_TO_TEXT = ["low", "medium", "high"];

export default function TaskItemOptions(props) {
  const priorityToButton = (priority, index) => {
    return  <button className={`priorityButton ${props.priority === priority ? `whiteText selectedPriority` : ''}`}
                    onClick={() => props.handleChangePriority(priority)}
                    key={index}
                    aria-label={`${props.priority === priority ? "deselect" : "select"} priority level ${PRIORITY_TO_TEXT[priority - 1]}`}>
                      {'!'.repeat(priority)}
            </button>
  }

  return <>
    <div className="toDoLowerHalf" />
    <div className="toDoItemOptions">
      <button className={`editButton toDoItemActionButton ${props.taskInEditModeId === props.id ? 'grayText' : ''}`} 
              onClick={props.onClickEditButton}>
                edit
      </button>
      <button className={`deleteButton toDoItemActionButton ${props.taskInEditModeId === props.id ? 'grayText' : ''}`}
              onClick={() => props.handleDeletion()}>
                delete
      </button>
      <div />
      {
        PRIORITIES.map((p, index) => priorityToButton(p, index))
      }
    </div>
  </>
}
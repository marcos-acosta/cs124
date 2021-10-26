import "./TaskItemOptions.css"

const PRIORITIES = [1, 2, 3];

export default function TaskItemOptions(props) {
  const priorityToButton = (priority, index) => {
    return  <button className={`priorityButton ${props.priority === priority ? `whiteText priority${priority}` : ''}`}
                    onClick={() => props.handleChangePriority(priority)}
                    key={index}>
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
      {
        PRIORITIES.slice().reverse().map((p, index) => priorityToButton(p, index))
      }
    </div>
  </>
}
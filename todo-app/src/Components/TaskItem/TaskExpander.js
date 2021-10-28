import "./TaskExpander.css"

export default function TaskExpander(props) {
  return (
    <div className="toDoOptions">
      <div  className={`toDoDropdown ${props.expandedId === props.taskId ? 'selected' : ''}`}
            onClick={() => props.expandTaskCallback(props.taskId)}>
        <div className={`optionsArrow ${props.expandedId === props.taskId ? 'rotated' : ''}`}>
          ➔
        </div>
      </div>
    </div>
  );
}
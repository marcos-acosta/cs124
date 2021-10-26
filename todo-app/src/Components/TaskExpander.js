import "./TaskExpander.css"

export default function TaskExpander(props) {
  return (
    <div className="toDoOptions">
      <div  className={`toDoDropdown ${props.expandedTaskId === props.id ? 'selected' : ''}`}
            onClick={() => props.expandTaskCallback(props.id)}>
        <div className={`optionsArrow ${props.expandedTaskId === props.id ? 'rotated' : ''}`}>
          ➔
        </div>
      </div>
    </div>
  );
}
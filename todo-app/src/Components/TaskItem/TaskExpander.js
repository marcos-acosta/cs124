import "./TaskExpander.css"

export default function TaskExpander(props) {
  return (
    <div className="toDoOptions">
      <div  className={`toDoDropdown ${props.expandedId === props.id ? 'selected' : ''}`}
            onClick={() => props.expandTaskCallback(props.id)}>
        <div className={`optionsArrow ${props.expandedId === props.id ? 'rotated' : ''}`}>
          ➔
        </div>
      </div>
    </div>
  );
}
import "./TaskExpander.css"

export default function TaskExpander(props) {
  return (
    <button className="toDoOptions" onClick={() => props.expandTaskCallback(props.id)}>
      <div  className={`toDoDropdown ${props.expandedId === props.id ? 'selected' : ''}`}>
        <div className={`optionsArrow ${props.expandedId === props.id ? 'rotated' : ''}`}>
          ➔
        </div>
      </div>
    </button>
  );
}
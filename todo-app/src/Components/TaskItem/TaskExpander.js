import "./TaskExpander.css"

export default function TaskExpander(props) {
  return (
    <button className="toDoOptions" onClick={() => props.expandTaskCallback(props.id)} aria-label="expand task options">
      <div  className={`toDoDropdown ${props.expandedId === props.id ? (props.color ? `color_${props.color}_bg` : 'selected') : ''}`}>
        <div className={`optionsArrow ${props.expandedId === props.id ? 'rotated' : ''}`}>
          ➔
        </div>
      </div>
    </button>
  );
}
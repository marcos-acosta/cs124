import "./TaskExpander.css"

export default function TaskExpander(props) {
  const isExpanded = props.expandedId === props.id;

  return (
    <button className="toDoOptions" onClick={() => props.expandTaskCallback(props.id)} aria-label={`${isExpanded ? 'hide' : 'show'} task options`}>
      <div  className={`toDoDropdown ${isExpanded ? (props.color ? `color_${props.color}_bg` : 'selected') : ''}`}>
        <div className={`optionsArrow ${isExpanded ? 'rotated' : ''}`}>
          ➔
        </div>
      </div>
    </button>
  );
}
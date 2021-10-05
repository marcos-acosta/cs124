import './TaskItem.css';

export default function TaskItem(props) {

  return (
    <div className="toDoItem">
      <div className="toDoItemInline">
        <input type="checkbox" id={`label-${props.id}`} />
        <label id={`label-${props.id}`} className={props.isCompleted ? "strikethrough" : ""}>
          {props.taskName}
        </label>
        {!props.isCompleted && <button className="toDoItemMoreOptions">
          ᐳ
        </button>}
      </div>
    </div>
  )
}
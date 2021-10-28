import "./TaskTextLabel.css"

const TEXT_CHAR_LIMIT = 80;

function elideText(text) {
  return text.length > TEXT_CHAR_LIMIT ? text.slice(0, TEXT_CHAR_LIMIT) + '...' : text;
}

function trimNewline(text) {
  while (text.indexOf('\n') !== -1) {
    text = text.replace('\n', '');
  }
  return text;
}

export default function TaskTextLabel(props) {
  return (
    <div className="toDoLabel">
      {
        props.taskInEditModeId !== props.id &&
          <label id={`label-${props.id}`} className={props.isCompleted || props.shouldFadeOut ? 'strikethrough' : ''}>
            {
              props.expandedTaskId === props.id
              ? props.taskName
              : elideText(props.taskName)
            }
          </label>
      }
      <textarea 
        value={props.taskName} 
        onChange={e => props.setTaskProperty(props.id, 'taskName', trimNewline(e.target.value))}
        onKeyUp={e => {if (e.key === 'Enter') props.setTaskInEditModeId(null)}} 
        ref={props.textInput}
        className={`${props.taskInEditModeId !== props.id ? 'hidden' : ''}`}
        onBlur={() => props.deselectOnEditMode()} />
    </div>
  )
}
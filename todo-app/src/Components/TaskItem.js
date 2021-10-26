import { useEffect, useRef, useState } from 'react';
import TaskItemOptions from './TaskItemOptions';
import './TaskItem.css';

export default function TaskItem(props) {
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  const textInput = useRef(null);
  const TEXT_CHAR_LIMIT = 100;
  const DISAPPEAR_DURATION_MS = 500;

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, []);

  function elideText(text) {
    return text.length > TEXT_CHAR_LIMIT ? text.slice(0, TEXT_CHAR_LIMIT) + '...' : text;
  }

  function priorityToMarker(priority) {
    return <div className={`priorityExclamationDiv priority${priority}`}>{'!'.repeat(priority)}</div>;
  }

  function onClickEditButton() {
    props.setTaskInEditModeId(props.id);
    // For some reason, React needs a moment to get the textInput ref
    setTimeout(() => textInput.current.focus(), 1);
  }

  function deselectOnEditMode() {
    props.setTaskInEditModeId(null);
    if (!props.taskName) {
      handleDeletion();
    }
  }

  function handleDeletion() {
    setShouldFadeOut(true);
    setTimeout(() => props.deleteTask(props.id), DISAPPEAR_DURATION_MS);
  }

  function handleCompletion(e) {
    setShouldFadeOut(true);
    let checked = e.target.checked;
    setTimeout(() => props.setTaskProperty(props.id, 'isCompleted', checked), DISAPPEAR_DURATION_MS);
  }

  function handleChangePriority(priority) {
    if (props.priority === priority) {
      props.setTaskProperty(props.id, 'priority', 0);
    } else {
      props.setTaskProperty(props.id, 'priority', priority);
    }
  }

  return (
    <>
      <div className={`priorityMarker supportsInvisibility ${shouldFadeOut ? 'invisible' : ''}`}>
        {priorityToMarker(props.priority)}
      </div>
      <div className={`toDoItem supportsInvisibility ${shouldFadeOut ? 'invisible' : ''}`}>
          <div className="toDoCheckbox">
            <input  type="checkbox" 
                    id={`label-${props.id}`} 
                    checked={props.isCompleted} 
                    onChange={e => handleCompletion(e)}/>
          </div>
          <div className="toDoLabel">
            {
              props.taskInEditModeId !== props.id &&
                <label id={`label-${props.id}`} className={props.isCompleted || shouldFadeOut ? 'strikethrough' : ''}>
                  {
                    props.expandedTaskId === props.id
                    ? props.taskName
                    : elideText(props.taskName)
                  }
                </label>
            }
            <input 
              value={props.taskName} 
              onChange={e => props.setTaskProperty(props.id, 'taskName', e.target.value)}
              onKeyUp={e => {if (e.key === 'Enter') props.setTaskInEditModeId(null)}} 
              ref={textInput}
              className={props.taskInEditModeId !== props.id ? 'hidden' : ''}
              onBlur={() => deselectOnEditMode()} />
          </div>
          {
            !props.isCompleted && 
              <div className="toDoOptions">
                <div  className={`toDoDropdown ${props.expandedTaskId === props.id ? 'selected' : ''}`}
                      onClick={() => props.expandTaskCallback(props.id)}>
                  <div className={`optionsArrow ${props.expandedTaskId === props.id ? 'rotated' : ''}`}>
                    ➔
                  </div>
                </div>
              </div>
          }
          {
            props.expandedTaskId === props.id &&
              <TaskItemOptions
                {...props} 
                handleChangePriority={handleChangePriority}
                onClickEditButton={onClickEditButton}
                handleDeletion={handleDeletion} />
          }
      </div>
    </>
  )
}
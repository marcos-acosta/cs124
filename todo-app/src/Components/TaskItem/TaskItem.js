import { useEffect, useRef, useState } from 'react';
import TaskItemOptions from './TaskItemOptions';
import TaskCheckbox from './TaskCheckbox';
import TaskTextLabel from './TaskTextLabel';
import TaskExpander from './TaskExpander';
import './TaskItem.css';

export default function TaskItem(props) {
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  const textInput = useRef(null);
  const DISAPPEAR_DURATION_MS = 500;

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, []);

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
      <div className={`toDoItem supportsInvisibility ${shouldFadeOut ? 'invisible' : ''} ${props.expandedTaskId === props.id ? 'highlighted' : ''}`}>
          <TaskCheckbox id={props.id} checked={props.isCompleted} handleCompletion={handleCompletion} />
          <TaskTextLabel 
            {...props}
            textInput={textInput}
            deselectOnEditMode={deselectOnEditMode}
            shouldFadeOut={shouldFadeOut} />
          {
            !props.isCompleted && 
              <TaskExpander taskId={props.id}
                            expandedId={props.expandedTaskId}
                            expandTaskCallback={props.expandTaskCallback} />
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
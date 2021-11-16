import './App.css';
import TaskList from './Components/TaskList';
import CompletedSection from './Components/CompletedSection';
import AddItem from './Components/AddItem';
import OptionSelector from './Components/OptionSelector';
import { useState } from 'react';
import InfoCard from './Components/InfoCard';

const SORTING_OPTIONS = [['oldestTop', 'oldest'], ['newestTop', 'newest'], ['taskName', 'name'], ['priority', 'priority']];

function App(props) {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleExpandedTaskId = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  }

  function addTaskAndEdit() {
    const id = props.addTask();
    props.setTaskInEditModeId(id);
    setExpandedTaskId(id);
  }

  return (
    <>
      <div className="headerRow">
        <button onClick={() => props.setCurrentListId(null)} className="backButton" aria-label="back to list menu">← back</button>
        <div className="toDoHeader">
          <h2>
            {props.currentList.listName}
          </h2>
        </div>
      </div>
      <div id="pageContent">
        <div className="noTopMargin">
          <div className="sortByText">sort by:</div>
          <OptionSelector options={SORTING_OPTIONS} onChangeCallback={props.setOrderingBy} />
        </div>
        {
          props.loading ? <InfoCard /> : 
          props.error ? <InfoCard error={props.error} /> :
          <>
            {props.data.filter(taskItem => !taskItem.isCompleted).length === 0 && 
              <button id="noTasksPlaceholder" onClick={addTaskAndEdit}>add a task!</button>
            }
            <TaskList tasks={props.data.filter(taskItem => !taskItem.isCompleted)} 
                      setTaskProperty={props.setTaskProperty} 
                      deleteTask={props.deleteTask}
                      taskInEditModeId={props.taskInEditModeId}
                      setTaskInEditModeId={props.setTaskInEditModeId}
                      toggleExpandedTaskId={toggleExpandedTaskId}
                      expandedTaskId={expandedTaskId}
                       />
            {
              props.data.filter(taskItem => taskItem.isCompleted).length === 0
                ? ''
                : <CompletedSection 
                    deleteCompleted={props.deleteCompleted}
                    tasks={props.data.filter(taskItem => taskItem.isCompleted)}
                    setTaskProperty={props.setTaskProperty}
                    deleteTask={props.deleteTask}/>
            }
          </>
        }
      </div>
      <AddItem 
        inEditMode={props.taskInEditModeId !== null || props.loading ? true : false} 
        addTaskAndEdit={addTaskAndEdit}
        isNarrow={props.isNarrow}
        longText={"add task"} />
    </>
  );
}

export default App;
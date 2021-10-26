import './App.css';
import AppHeader from './Components/AppHeader';
import TaskList from './Components/TaskList';
import CompletedSection from './Components/CompletedSection';
import AddItem from './Components/AddItem';
import OptionSelector from './Components/OptionSelector';

const SORTING_OPTIONS = [['oldestTop', 'oldest'], ['newestTop', 'newest'], ['taskName', 'name'], ['priority', 'priority']];

function App(props) {
  function addTaskAndEdit() {
    const id = props.addTask();
    props.setTaskInEditModeId(id);
  }

  return (
    <>
      <AppHeader />
      <div id="pageContent">
        <div className="noTopMargin">
          <div className="sortByText">sort by:</div>
          <OptionSelector options={SORTING_OPTIONS} onChangeCallback={props.setOrderingBy} />
        </div>
        {
          props.loading ? <div className="infoText">loading...</div> : 
          props.error ? <div className="infoText errorText">an unexpected error occurred!</div> :
          <>
            {props.data.filter(taskItem => !taskItem.isCompleted).length === 0 && 
              <div id="noTasksPlaceholder" onClick={addTaskAndEdit}>add a task!</div>
            }
            <TaskList tasks={props.data.filter(taskItem => !taskItem.isCompleted)} 
                      setTaskProperty={props.setTaskProperty} 
                      deleteTask={props.deleteTask}
                      taskInEditModeId={props.taskInEditModeId}
                      setTaskInEditModeId={props.setTaskInEditModeId} />
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
      <AddItem inEditMode={props.taskInEditModeId || props.loading ? true : false} addTaskAndEdit={addTaskAndEdit} />
    </>
  );
}

export default App;
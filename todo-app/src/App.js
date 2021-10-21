import './App.css';
import AppHeader from './Components/AppHeader';
import TaskList from './Components/TaskList';
import CompletedSection from './Components/CompletedSection';
import AddItem from './Components/AddItem';
import { useState } from 'react';
import OrderSelector from './Components/OptionSelector';

function App(props) {
  const [taskInEditModeId, setTaskInEditModeId] = useState(null);

  function addTaskAndEdit() {
    const id = props.addTask();
    setTaskInEditModeId(id);
  }

  return (
    <>
      <AppHeader />
      <div id="pageContent">
        <OrderSelector options={['created', 'taskName', 'priority']} onChangeCallback={props.setOrderingBy} />
        {
          props.loading ? 'loading...' : 
          <>
            {props.data.filter(taskItem => !taskItem.isCompleted).length === 0 && 
              <div id="noTasksPlaceholder" onClick={addTaskAndEdit}>add a task!</div>
            }
            <TaskList tasks={props.data.filter(taskItem => !taskItem.isCompleted)} 
                      setTaskProperty={props.setTaskProperty} 
                      deleteTask={props.deleteTask}
                      taskInEditModeId={taskInEditModeId}
                      setTaskInEditModeId={setTaskInEditModeId} />
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
      <AddItem inEditMode={taskInEditModeId || props.loading ? true : false} addTaskAndEdit={addTaskAndEdit} />
    </>
  );
}

export default App;
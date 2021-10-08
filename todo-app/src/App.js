import './App.css';
import AppHeader from './Components/AppHeader';
import TaskList from './Components/TaskList';
import CompletedSection from './Components/CompletedSection';
import AddItem from './Components/AddItem';

function App(props) {
  return (
    <>
      <AppHeader />
      <div id="pageContent">
        <TaskList tasks={props.data.filter(taskItem => !taskItem.isCompleted)} setTaskProperty={props.setTaskProperty} deleteTask={props.deleteTask}/>
        {
          props.data.filter(taskItem => taskItem.isCompleted).length === 0 ? '' :
          <>
            <CompletedSection clearCompleted={props.clearCompleted} />
            <TaskList   tasks={props.data.filter(taskItem => taskItem.isCompleted)} 
                        setTaskProperty={props.setTaskProperty} 
                        deleteTask={props.deleteTask}/>
          </>
        }
        
      </div>
      <AddItem />
    </>
  );
}

export default App;
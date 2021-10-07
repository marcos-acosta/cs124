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
        <TaskList tasks={props.data.filter(taskItem => !taskItem.isCompleted)} />
        <CompletedSection tasks={props.data} />
        <TaskList tasks={props.data.filter(taskItem => taskItem.isCompleted)} />
      </div>
      <AddItem />
    </>
  );
}

export default App;
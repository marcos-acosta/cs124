import './TaskView.css';
import TaskList from './TaskList';
import CompletedSection from './CompletedSection';
import AddItem from './../AddItem';
import OptionSelector from './../OptionSelector';
import ListSideMenu from './ListSideMenu';
import { useState } from 'react';
import InfoCard from './../InfoCard';
import SharingPanel from './../AuthAndSharing/SharingPanel';

const SORTING_OPTIONS = [['oldestTop', 'oldest'], ['newestTop', 'newest'], ['taskName', 'name'], ['priority', 'priority']];

function TaskView(props) {
  return props.isDesktopWide ? 
    <div className="pageColumnsDiv">
      <div className="listSelector">
        <ListSideMenu lists={props.lists} setCurrentListId={props.setCurrentListId} currentListId={props.currentListId} />
      </div>
      <div>
        <TasksApp {...props} />
      </div>
    </div> : <TasksApp {...props} />;
}

function TasksApp(props) {
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [showSharingPanel, setShowSharingPanel] = useState(false);
  const currentList = props.lists.find(list => list.id === props.currentListId);

  const toggleExpandedTaskId = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  }

  function addTaskAndEdit() {
    const id = props.addTask();
    props.setTaskInEditModeId(id);
    setExpandedTaskId(id);
  }

  return (
      <div>
        {
          showSharingPanel && <SharingPanel onClosePanel={() => setShowSharingPanel(false)}
                                            addToListField={props.addToListField}
                                            currentListId={props.currentListId}
                                            sharedEmails={currentList.sharedWith}
                                            admins={currentList.admins}
                                            removeFromListField={props.removeFromListField}
                                            owner={currentList.owner}
                                            pendingInvitations={currentList.pendingInvitations}
                                            user={props.user} />
        }
        <div className="headerRow">
          <button   onClick={() => props.setCurrentListId(null)} 
                    className="backButton" 
                    aria-label="back to list menu">
                      ← back
          </button>
          <div className="toDoHeader">
            <h2 className={currentList ? `color_${currentList.colorTheme}_ul` : ''}>
              {currentList.listName}
            </h2>
          </div>
        </div>
        <div id="pageContent">
          <div className="noTopMargin">
            <div className="sortByText">sort by:</div>
            <OptionSelector options={SORTING_OPTIONS} onChangeCallback={props.setOrderingBy} />
            <button className="sharingButton" onClick={() => setShowSharingPanel(true)}>
              share
            </button>
          </div>
          {
            props.loading ? <InfoCard /> : 
            props.error ? <InfoCard error={props.error} /> :
            <>
              {props.data.filter(taskItem => !taskItem.isCompleted).length === 0 && 
                <button className="noTasksPlaceholder" onClick={addTaskAndEdit}>
                  add a task!
                </button>
              }
              <TaskList tasks={props.data.filter(taskItem => !taskItem.isCompleted)} 
                        setTaskProperty={props.setTaskProperty} 
                        deleteTask={props.deleteTask}
                        taskInEditModeId={props.taskInEditModeId}
                        setTaskInEditModeId={props.setTaskInEditModeId}
                        toggleExpandedTaskId={toggleExpandedTaskId}
                        expandedTaskId={expandedTaskId}
                        color={currentList.colorTheme}
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
          longText={"add task"}
          color={`color_${currentList.colorTheme}_bg`} />
      </div>
  );
}

export default TaskView;
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from 'firebase/compat';
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import TaskView from "./TaskView";
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';

export default function TaskSupplier(props) {
  const [frozenTask, setFrozenTask] = useState(null);
  const [taskInEditModeId, setTaskInEditModeId] = useState(null);
  const [orderingBy, setOrderingBy] = useState("created");
  const taskQuery = props.db.collection(props.collectionName).doc(props.currentListId).collection("tasks");
  const [taskCollection, tasksLoading, tasksError] = useCollection(taskQuery);
  const isNarrow = useMediaQuery({maxWidth: 500});
  const isDesktopWide = useMediaQuery({minWidth: 800});

  const sortFunctions = {
    priority: (a, b) => frozen(b)['priority'] - frozen(a)['priority'],
    taskName: (a, b) => frozen(a)['taskName'].toLowerCase() < frozen(b)['taskName'].toLowerCase() ? -1 : 1,
    newestTop: (a, b) => frozen(a)['created'] < frozen(b)['created'] ? 1 : -1,
    oldestTop: (a, b) => frozen(a)['created'] < frozen(b)['created'] ? -1 : 1
  }

  useEffect(() => {
    if (!tasksLoading && !tasksError) {
      if (taskInEditModeId) {
        setFrozenTask(
          taskCollection.docs.map(doc => doc.data()).find(task => task.id === taskInEditModeId)
        );
      } else {
        setFrozenTask(null);
      }
    }
  // eslint-disable-next-line
  }, [taskInEditModeId, tasksLoading, tasksError, (taskCollection && taskCollection.docs.length)]);

  const frozen = (element) => {
    return frozenTask && element.id === frozenTask.id ? frozenTask : element;
  }

  const setTaskProperty = (id, field, value) => {
    const docRef = taskQuery.doc(id);
    docRef.update({[field]: value});
  }

  const deleteTask = (id) => {
    const docRef = taskQuery.doc(id);
    docRef.delete();
  }

  const deleteCompleted = () => 
  taskCollection.docs.map(doc => doc.data()).filter(task => task.isCompleted).forEach(task => deleteTask(task.id));

  const addTask = () => {
    const new_id = generateUniqueID();
    const docRef = taskQuery.doc(new_id);
    docRef.set({
      taskName: "",
      isCompleted: false,
      id: new_id,
      created: firebase.database.ServerValue.TIMESTAMP,
      priority: 0
    });
    return new_id;
  }

  const getSortedTasks = () => {
    return tasksLoading
      ? null
      : taskCollection.docs.map(doc => doc.data()).sort(sortFunctions[orderingBy]);
  }

  return <TaskView  {...props}
                    setTaskProperty={setTaskProperty}
                    deleteTask={deleteTask}
                    deleteCompleted={deleteCompleted}
                    setOrderingBy={setOrderingBy}
                    addTask={addTask}
                    data={getSortedTasks()}
                    loading={tasksLoading}
                    error={tasksError}
                    taskInEditModeId={taskInEditModeId}
                    setTaskInEditModeId={setTaskInEditModeId}
                    isNarrow={isNarrow}
                    isDesktopWide={isDesktopWide}
                    lists={props.lists} />
}
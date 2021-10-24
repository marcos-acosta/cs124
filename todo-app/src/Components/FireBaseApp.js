import { useCollection } from "react-firebase-hooks/firestore";
import firebase from 'firebase/compat';
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import App from "../App";
import { useState } from "react";

const COLLECTION_NAME = 'marcos-acosta-tasks';

const SORT_FUNCTIONS = {
  priority: (a, b) => b['priority'] - a['priority'],
  taskName: (a, b) => a['taskName'] < b['taskName'] ? -1 : 1,
  newestTop: (a, b) => a['created'] < b['created'] ? 1 : -1,
  oldestTop: (a, b) => a['created'] < b['created'] ? -1 : 1,
}

export default function FireBaseApp(props) {
  const [orderingBy, setOrderingBy] = useState("created");
  const completeDataQuery = props.db.collection(COLLECTION_NAME);
  const [value, loading, error] = useCollection(completeDataQuery);

  const setTaskProperty = (id, field, value) => {
    const docRef = completeDataQuery.doc(id);
    docRef.update({[field]: value});
  }

  const deleteTask = (id) => {
    const docRef = completeDataQuery.doc(id);
    docRef.delete();
  }

  const deleteCompleted = () => {
    value.docs.map(doc => doc.data()).filter(task => task.isCompleted).forEach(task => deleteTask(task.id));
  }

  const addTask = () => {
    const new_id = generateUniqueID();
    const docRef = completeDataQuery.doc(new_id);
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
    return loading
      ? null
      : value.docs.map(doc => doc.data()).sort(SORT_FUNCTIONS[orderingBy]);
  }

  return <App setTaskProperty={setTaskProperty}
              deleteTask={deleteTask}
              deleteCompleted={deleteCompleted}
              setOrderingBy={setOrderingBy}
              addTask={addTask}
              data={getSortedTasks()}
              loading={loading}
              error={error} />
}
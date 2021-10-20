import { useCollection } from "react-firebase-hooks/firestore";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import App from "../App";

const COLLECTION_NAME = 'marcos-acosta-tasks';

export default function FireBaseApp(props) {
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
      id: new_id
    });
    return new_id;
  }

  return loading && !error ? 'Loading...' :
          <App  setTaskProperty={setTaskProperty}
                deleteTask={deleteTask}
                deleteCompleted={deleteCompleted}
                addTask={addTask}
                data={value.docs.map(doc => doc.data())} />
}
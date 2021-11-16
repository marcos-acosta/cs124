import TaskSupplier from "./TaskSupplier";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ListViewer from "./ListViewer";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from 'firebase/compat';
import "./App.css";

export default function App(props) {
  const completeDataQuery = props.db.collection("lists");
  const [value, loading, error] = useCollection(completeDataQuery);
  const [currentListId, setCurrentListId] = useState(null);

  const deleteList = (id) => {
    const docRef = completeDataQuery.doc(id);
    docRef.delete();
  }

  const addList = () => {
    const new_id = generateUniqueID();
    const docRef = completeDataQuery.doc(new_id);
    docRef.set({
      listName: "",
      id: new_id,
      created: firebase.database.ServerValue.TIMESTAMP,
    });
    return new_id;
  }

  const setListProperty = (id, field, value) => {
    const docRef = completeDataQuery.doc(id);
    docRef.update({[field]: value});
  }

  return (
    <div className="minWidthContainer">
      {currentListId  ? <TaskSupplier 
                            currentListId={currentListId}
                            currentList={(loading || error) ? [] : value.docs.map(doc => doc.data()).find(list => list.id === currentListId)}
                            lists={!loading && !error && value.docs.map(doc => doc.data())}
                            db={props.db} setCurrentListId={setCurrentListId} />
                      : <ListViewer lists={(loading || error) ? [] : value.docs.map(doc => doc.data())} 
                                    setCurrentListId={setCurrentListId} 
                                    deleteList={deleteList}
                                    addList={addList}
                                    setListProperty={setListProperty}
                                    loading={loading}
                                    error={error}/>}
      </div>
    )
}
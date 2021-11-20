import TaskSupplier from "./TaskSupplier";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ListViewer from "./ListViewer";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from 'firebase/compat';
import "./App.css";

export default function App(props) {
  const listQuery = props.db.collection("lists");
  const [listCollection, listsLoading, listsError] = useCollection(listQuery);
  const [currentListId, setCurrentListId] = useState(null);

  const deleteList = (id) => {
    const docRef = listQuery.doc(id);
    docRef.delete();
  }

  const addList = () => {
    const new_id = generateUniqueID();
    const docRef = listQuery.doc(new_id);
    docRef.set({
      listName: "",
      id: new_id,
      created: firebase.database.ServerValue.TIMESTAMP,
      colorTheme: "blue"
    });
    return new_id;
  }

  const setListProperty = (id, field, value) => {
    const docRef = listQuery.doc(id);
    docRef.update({[field]: value});
  }

  return (
    <div className="minWidthContainer">
      {currentListId  ? <TaskSupplier   currentListId={currentListId}
                                        lists={!listsLoading && !listsError && listCollection.docs.map(doc => doc.data())}
                                        db={props.db}
                                        setCurrentListId={setCurrentListId} />
                      : <ListViewer lists={(listsLoading || listsError) ? [] : listCollection.docs.map(doc => doc.data())} 
                                    setCurrentListId={setCurrentListId} 
                                    deleteList={deleteList}
                                    addList={addList}
                                    setListProperty={setListProperty}
                                    loading={listsLoading}
                                    error={listsError}/>
        }
      </div>
    )
}
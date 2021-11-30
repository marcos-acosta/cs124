import TaskSupplier from "./TaskSupplier";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ListViewer from "./ListViewer";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from 'firebase/compat';
import "./App.css";
import SignedInStatus from "./SignedInStatus";

const COLLECTION_NAME = "lists-lab5"

export default function App(props) {
  const fullListData = props.db.collection(COLLECTION_NAME);
  const listQuery = fullListData.where("sharedWith", "array-contains", props.user.email);
  const [listCollection, listsLoading, listsError] = useCollection(listQuery);
  const [currentListId, setCurrentListId] = useState(null);

  const deleteList = (id) => {
    const docRef = fullListData.doc(id);
    docRef.delete();
  }

  const addList = () => {
    const new_id = generateUniqueID();
    const docRef = fullListData.doc(new_id);
    docRef.set({
      listName: "",
      id: new_id,
      created: firebase.database.ServerValue.TIMESTAMP,
      colorTheme: "blue",
      owner: props.user.uid,
      sharedWith: [props.user.email]
    });
    return new_id;
  }

  const setListProperty = (id, field, value) => {
    const docRef = fullListData.doc(id);
    docRef.update({[field]: value});
  }

  return (
    <div className="minWidthContainer">
      <SignedInStatus auth={props.auth} user={props.user} />
      {currentListId  ? <TaskSupplier   currentListId={currentListId}
                                        lists={!listsLoading && !listsError && listCollection.docs.map(doc => doc.data())}
                                        db={props.db}
                                        collectionName={COLLECTION_NAME}
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
import TaskSupplier from "./TaskView/TaskSupplier";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ListViewer from "./ListView/ListViewer";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from 'firebase/compat';
import "./App.css";

const COLLECTION_NAME = "lists-lab5"

export default function App(props) {
  const fullListData = props.db.collection(COLLECTION_NAME);
  const listQuery = fullListData.where("sharedWith", "array-contains", props.user.email);
  const pendingListQuery = fullListData.where("pendingInvitations", "array-contains", props.user.email);
  const [listCollection, listsLoading, listsError] = useCollection(listQuery);
  const [pendingCollection, pendingLoading, pendingError] = useCollection(pendingListQuery);
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
      owner: props.user.email,
      admins: [props.user.email],
      sharedWith: [props.user.email],
      pendingInvitations: []
    });
    return new_id;
  }

  const setListProperty = (id, field, value) => {
    const docRef = fullListData.doc(id);
    docRef.update({[field]: value});
  }

  const addToListField = (id, field, value) => {
    const docRef = fullListData.doc(id);
    docRef.get().then(listResponse =>
      docRef.update({[field]: [...listResponse.data()[field], value]})
    );
  }

  const removeFromListField = (id, field, value) => {
    const docRef = fullListData.doc(id);
    docRef.get().then(listResponse =>
      docRef.update({[field]: listResponse.data()[field].filter(val => val !== value)})
    );
  }

  return currentListId  ? <TaskSupplier   currentListId={currentListId}
                                        lists={!listsLoading && !listsError && listCollection.docs.map(doc => doc.data())}
                                        db={props.db}
                                        collectionName={COLLECTION_NAME}
                                        setCurrentListId={setCurrentListId}
                                        addToListField={addToListField}
                                        removeFromListField={removeFromListField}
                                        user={props.user}
                                        auth={props.auth} />
                        : <ListViewer lists={(listsLoading || listsError) ? [] : listCollection.docs.map(doc => doc.data())}
                                      pendingLists={(pendingLoading || pendingError) ? [] : pendingCollection.docs.map(doc => doc.data())}
                                      setCurrentListId={setCurrentListId} 
                                      deleteList={deleteList}
                                      addList={addList}
                                      setListProperty={setListProperty}
                                      loading={listsLoading}
                                      error={listsError}
                                      user={props.user}
                                      auth={props.auth}
                                      addToListField={addToListField}
                                      removeFromListField={removeFromListField}/>
}
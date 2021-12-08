import ListCard from "./ListCard";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import "./ListViewer.css";
import AddItem from "./../AddItem";
import InfoCard from "./../InfoCard";

export default function ListViewer(props) {
  const [listInEditModeId, setListInEditModeId] = useState(null);
  const isNarrow = useMediaQuery({maxWidth: 500});

  const addListCallback = () => {
    setListInEditModeId(props.addList());
  }

  const removeFromPending = (id) => {
    props.removeFromListField(id, "pendingInvitations", props.user.email);
  }

  const onAcceptCallback = (id) => {
    props.addToListField(id, "sharedWith", props.user.email);
    removeFromPending(id);
  }

  return <>
      <div className="header">
        <h4>
          <span className="todo">todo</span> 🦑
        </h4>
      </div>
      <div className="listContainer">
        { props.loading ? <InfoCard /> :
          props.error ? <InfoCard error={props.error} /> :
            <>
              {props.lists.length === 0 && 
                <button className="noListsPlaceholder" onClick={addListCallback}>create a task list!</button>
              }
              {
                props.lists.map(list => <ListCard 
                                          {...props}
                                          {...list}
                                          key={list.id} 
                                          listInEditModeId={listInEditModeId}
                                          setListInEditModeId={setListInEditModeId} />)
              }
            </>
          }
      </div>
      <div className="centerContent">
            {
              props.pendingLists.length !== 0 &&
              (
                !props.user.emailVerified
                  ? <div className="verifyToSeeDiv">
                      <b>you have pending invites to join a collaborative list!</b>
                      <br />
                      verify your email (in the account panel) to see them.
                    </div>
                  : <>
                      <h3>
                        Pending invitations
                      </h3>
                      <div className="listContainer">
                        {
                          <>
                            {
                              props.pendingLists.map(list => <ListCard 
                                                        {...props}
                                                        {...list}
                                                        key={list.id} 
                                                        listInEditModeId={listInEditModeId}
                                                        setListInEditModeId={setListInEditModeId}
                                                        isPendingList
                                                        onAcceptCallback={() => onAcceptCallback(list.id)}
                                                        onRejectCallback={() => removeFromPending(list.id)}/>)
                            }
                          </>
                        }
                      </div>
                    </>
              )
            }
          </div>
      
      <AddItem 
        isNarrow={isNarrow} 
        addTaskAndEdit={addListCallback} 
        inEditMode={listInEditModeId}
        longText={"add list"} />
    </>
}
import ListCard from "./ListCard";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import "./ListViewer.css";
import AddItem from "./../AddItem";
import InfoCard from "./../InfoCard";
import SignedInStatus from "../AuthAndSharing/SignedInStatus";

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
      <div className="headerRow">
        <div className="todoHeader">
          <h4>
            <span className="todo">todo</span>
          </h4>
        </div>
        <div className="authPanelContainer">
          <SignedInStatus auth={props.auth} user={props.user} />
        </div>
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
      {
        props.pendingLists.length !== 0 &&
        (
          !props.user.emailVerified
            ? <div className="verifyToSeeContainer">
                <div className="verifyToSeeDiv">
                  <b>you have pending invites to join a collaborative list!</b>
                  <hr />
                  verify your email (in the account panel) to see them.
                </div>
              </div>
            : <>
                <div className="listContainer">
                  <div className="sectionHeader">
                    pending invitations
                  </div>
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
      <AddItem 
        isNarrow={isNarrow} 
        addTaskAndEdit={addListCallback} 
        inEditMode={listInEditModeId}
        longText={"add list"} />
    </>
}
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

  const canShowList = (list) => {
    return props.user.emailVerified || list.owner === props.user.uid;
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
                props.lists.some(list => !canShowList(list)) && <div>Validate your email, guy</div>
              }
              {
                props.lists.map(list => canShowList(list)
                                    && <ListCard 
                                          {...props}
                                          {...list}
                                          key={list.id} 
                                          listInEditModeId={listInEditModeId}
                                          setListInEditModeId={setListInEditModeId}/>)
              }
            </>
          }
      </div>
      <AddItem 
        isNarrow={isNarrow} 
        addTaskAndEdit={addListCallback} 
        inEditMode={listInEditModeId}
        longText={"add list"} />
    </>
}
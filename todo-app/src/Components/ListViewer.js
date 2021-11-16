import ListPreview from "./ListPreview";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import "./ListViewer.css";
import AddItem from "./AddItem";

export default function ListViewer(props) {
  const [listInEditModeId, setListInEditModeId] = useState(null);
  const isNarrow = useMediaQuery({maxWidth: 500});

  const addListCallback = () => {
    setListInEditModeId(props.addList());
  }

  return <>
      <div className="header">
        <h3>
          todo 🦑
        </h3>
      </div>
      <div className="listContainer">
        {props.lists.map(list => <ListPreview 
                                    {...props}
                                    {...list}
                                    key={list.id} 
                                    listInEditModeId={listInEditModeId}
                                    setListInEditModeId={setListInEditModeId}/>)}
      </div>
      {/* <AddList callback={addListCallback} /> */}
      <AddItem 
        isNarrow={isNarrow} 
        addTaskAndEdit={addListCallback} 
        inEditMode={listInEditModeId}
        longText={"add list"} />
    </>
}
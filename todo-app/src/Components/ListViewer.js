import ListPreview from "./ListPreview";
import AddList from "./AddList";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import "./ListViewer.css";

export default function ListViewer(props) {
  const [listInEditModeId, setListInEditModeId] = useState(null);
  const isNarrow = useMediaQuery({maxWidth: 500});

  const addListCallback = () => {
    setListInEditModeId(props.addList());
  }

  return <>
      <div className="header">
        todo 🦑
      </div>
      {props.lists.map(list => <ListPreview 
                                  {...props}
                                  {...list}
                                  key={list.id} 
                                  listInEditModeId={listInEditModeId}
                                  setListInEditModeId={setListInEditModeId}/>)}
      <AddList callback={addListCallback} />
    </>
}
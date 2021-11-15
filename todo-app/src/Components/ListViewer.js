import ListPreview from "./ListPreview";
import AddList from "./AddList";
import { useState } from "react";

export default function ListViewer(props) {
  const [listInEditModeId, setListInEditModeId] = useState(null);

  const addListCallback = () => {
    setListInEditModeId(props.addList());
  }

  return <>
      {props.lists.map(list => <ListPreview 
                                  {...props}
                                  {...list}
                                  key={list.id} 
                                  listInEditModeId={listInEditModeId}
                                  setListInEditModeId={setListInEditModeId}/>)}
      <AddList callback={addListCallback} />
    </>
}
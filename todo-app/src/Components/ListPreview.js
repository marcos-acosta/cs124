import { useRef, useEffect } from "react";

export default function ListPreview(props) {
  const textInput = useRef(null);

  useEffect(() => {
    if (textInput.current && props.listInEditModeId === props.id) {
      textInput.current.focus();
    }
  }, [props.listInEditModeId, props.id]);

  return <div>
      {
        props.listInEditModeId === props.id
          ? <input 
              value={props.listName}
              onChange={e => props.setListProperty(props.id, "listName", e.target.value)}
              onKeyUp={e => {if (e.key === 'Enter') props.setListInEditModeId(null)}}
              onBlur={() => props.setListInEditModeId(null)}
              ref={textInput} />
          : props.listName
      }
      <button onClick={() => props.setCurrentListId(props.id)}>&gt;</button>
      <button onClick={() => props.deleteList(props.id)}>delete</button>
      <button onClick={() => props.setListInEditModeId(props.id)}>edit</button>
    </div>
}
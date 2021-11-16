import { useRef, useEffect, useState } from "react";
import "./ListPreview.css";

const DISAPPEAR_DURATION_MS = 500;

export default function ListPreview(props) {
  const textInput = useRef(null);
  const [willDisappear, setWillDisappear] = useState(false);

  useEffect(() => {
    if (textInput.current && props.listInEditModeId === props.id) {
      textInput.current.focus();
    }
  }, [props.listInEditModeId, props.id]);

  const onBlurCallback = () => {
    props.setListInEditModeId(null)
    if (!props.listName) {
      handleDeletion();
    }
  }

  const handleDeletion = () => {
    setWillDisappear(true);
    setTimeout(() => props.deleteList(props.id), DISAPPEAR_DURATION_MS);
  }

  return <div className={`listCard supportsInvisibility ${willDisappear ? 'invisible' : ''}`}>
    <div className="listEmoji">
      🗒️
    </div>
      {
        props.listInEditModeId === props.id
          ? <input 
              className="listNameInput"
              value={props.listName}
              onChange={e => props.setListProperty(props.id, "listName", e.target.value)}
              onKeyUp={e => {if (e.key === 'Enter') onBlurCallback()}}
              onBlur={() => onBlurCallback()}
              ref={textInput} />
          : <div className="listName" onClick={() => props.setCurrentListId(props.id)}>{props.listName}</div>
      }
      <button onClick={() => props.setListInEditModeId(props.id)} className="listActionButton editButton">edit</button>
      <button onClick={() => handleDeletion()} className="listActionButton deleteButton">delete</button>
      <button 
        onClick={() => props.setCurrentListId(props.id)} 
        className="listActionButton openButton"
        aria-label={`view list: ${props.listName}`}>➔</button>
    </div>
}
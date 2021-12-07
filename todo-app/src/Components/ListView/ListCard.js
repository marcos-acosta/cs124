import { useRef, useEffect, useState } from "react";
import InputKeepCursor from "./../InputKeepCursor";
import { BlockPicker } from 'react-color';
import "./ListCard.css";

const DISAPPEAR_DURATION_MS = 500;
const COLOR_TO_NAME = {
  "#2274a5": "blue",
  "#dc493a": "red",
  "#662c91": "purple",
  "#4a442d": "olive",
  "#70ae6e": "green",
}
const NAME_TO_COLOR = Object.fromEntries(Object.entries(COLOR_TO_NAME).map(([k, v]) => [v, k]));

export default function ListCard(props) {
  let textInput = useRef(null);
  const [startDisappearing, setstartDisappearing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

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
    setstartDisappearing(true);
    setTimeout(() => props.deleteList(props.id), DISAPPEAR_DURATION_MS);
  }

  return <div className={`listCard supportsInvisibility ${startDisappearing ? 'invisible' : ''}`}>
    <div className="listCardLeftPanel">
      <button   onClick={() => setShowColorPicker(!showColorPicker)} 
                className={`colorDropdown ${(props.colorTheme !== 'default') ? `color_${props.colorTheme}_bg` : ''}`}
                disabled={!props.admins.includes(props.user.email)}>
        <div className={`dropDownArrow ${showColorPicker ? 'flipped' : ''} ${!props.admins.includes(props.user.email) ? "transparentText" : ""}`} aria-label={`Select color theme for list: ${props.listName}`}>
          ⌵
        </div>
      </button>
      {
        showColorPicker && 
        <div className="colorPickerDiv">
          <BlockPicker
            color={NAME_TO_COLOR[props.colorTheme]}
            onChangeComplete={color => {props.setListProperty(props.id, "colorTheme", COLOR_TO_NAME[color.hex.toLowerCase()]); setShowColorPicker(false)}}
            colors={Object.keys(COLOR_TO_NAME)}
            className="float"
            triangle="hide" />
        </div>
      }
    </div>
      {
        props.listInEditModeId === props.id
            ? <InputKeepCursor
                value={props.listName}
                onChange={e => props.setListProperty(props.id, "listName", e.target.value)}
                onKeyUp={e => {if (e.key === 'Enter') onBlurCallback()}}
                onBlur={() => onBlurCallback()}
                returnRef={(ref) => {textInput = ref}}
                className="listNameInput"
                aria-label="edit list name" />
          : <div className="listName" onClick={() => props.setCurrentListId(props.id)}>{props.listName}</div>
      }
      {
        props.isPendingList
          ? <>
              <div></div>
              <button onClick={() => props.onAcceptCallback()}>accept</button>
              <button onClick={() => props.onRejectCallback()}>reject</button>
            </>
          : <>
              {props.admins.includes(props.user.email) ?
                <button 
                  onClick={() => props.setListInEditModeId(props.id)}
                  className="listActionButton linkButton editButton"
                  aria-label={`edit list name: ${props.listName}`}>edit</button> : <div />
              }
              {props.owner === props.user.email ?
                <button
                  onClick={() => handleDeletion()}
                  className="listActionButton linkButton deleteButton"
                  aria-label={`delete list: ${props.listName}`}>delete</button> : <div />
              }
              {props.sharedWith.includes(props.user.email) ?
                <button 
                  onClick={() => props.setCurrentListId(props.id)} 
                  className="listActionButton openButton"
                  aria-label={`view tasks in list: ${props.listName}`}>➔</button> : <div />
              }
            </>
      }
      
    </div>
}
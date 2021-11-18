import { useRef, useEffect, useState } from "react";
import InputKeepCursor from "./InputKeepCursor";
import { SwatchesPicker } from 'react-color';
import "./ListCard.css";

const DISAPPEAR_DURATION_MS = 500;
const COLOR_TO_NAME = {
  "#f7f7f7": "default",
  "#dc493a": "red",
  "#662c91": "purple",
  "#4a442d": "olive",
  "#2274a5": "blue",
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
    <div className="listEmoji">
      <button   onClick={() => setShowColorPicker(!showColorPicker)} 
                className={`colorDropdown ${(props.colorTheme !== 'default') ? `color_${props.colorTheme}_bg` : ''}`}>
        <div className={`dropDownArrow ${showColorPicker ? 'flipped' : ''}`}>
          ⌵
        </div>
      </button>
      {showColorPicker && 
      <div className="colorPickerDiv">
        <SwatchesPicker 
        color={NAME_TO_COLOR[props.colorTheme]}
        onChangeComplete={color => {props.setListProperty(props.id, "colorTheme", COLOR_TO_NAME[color.hex.toLowerCase()]); setShowColorPicker(false)}}
        colors={Object.keys(COLOR_TO_NAME).map(c => [c])}
        // colors={Object.keys(COLOR_TO_NAME)}
        className="float"
        triangle="hide"
        width="72px" 
          />
      </div>}

    </div>
      {
        props.listInEditModeId === props.id
            ? <InputKeepCursor
                value={props.listName}
                onChange={e => props.setListProperty(props.id, "listName", e.target.value)}
                onKeyUp={e => {if (e.key === 'Enter') onBlurCallback()}}
                onBlur={() => onBlurCallback()}
                returnRef={(ref) => {textInput = ref}}
                className="listNameInput" />
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
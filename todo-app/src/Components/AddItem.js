import './AddItem.css'

export default function AddItem(props) {
  return (
    <button className={`addItem ${props.isNarrow ? 'addItemNarrow' : 'addItemWide'}`} 
            onClick={() => props.addTaskAndEdit()} disabled={props.inEditMode}
            aria-label={props.longText}>
      {props.isNarrow ? `+ ${props.longText}` : "+"}
    </button>
  )
}
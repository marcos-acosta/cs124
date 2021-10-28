import './AddItem.css'

export default function AddItem(props) {
  return (
    <button id="addItemFooter" onClick={() => props.addTaskAndEdit()} disabled={props.inEditMode}>
      + add item
    </button>
  )
}
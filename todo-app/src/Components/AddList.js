import './AddList.css'

export default function AddItem(props) {
  return (
    <button id="addList" onClick={() => props.callback()}>
      + add list
    </button>
  )
}
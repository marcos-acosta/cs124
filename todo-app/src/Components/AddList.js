import './AddList.css'

export default function AddItem(props) {
  return (
    <button className="addList" onClick={() => props.callback()}>
      + add list
    </button>
  )
}
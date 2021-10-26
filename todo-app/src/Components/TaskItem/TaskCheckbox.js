import "./TaskCheckbox.css"

export default function ToDoCheckbox(props) {
  return (
    <div className="toDoCheckbox">
      <input  type="checkbox" 
              id={`label-${props.id}`} 
              checked={props.checked} 
              onChange={(e) => props.handleCompletion(e)}/>
    </div>
  )
}
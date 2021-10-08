import './CompletedSection.css'

export default function CompletedSection(props) {
  return (
    <div id="completedItemsHeader">
      <h3>
        completed
        <button id="clearCompleted" onClick={() => props.clearCompleted()}>clear</button>
      </h3>
    </div>
  )
}
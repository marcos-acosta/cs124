import "./ListSideMenu.css"

export default function ListSideMenu(props) {
  return (
    <div className="mainDiv">
      <h3>todo 🦑</h3>
      {props.lists.map(list => 
        <button 
          key={list.id}
          onClick={() => props.setCurrentListId(list.id)}
          className={`listButton ${props.currentListId === list.id ? (list.colorTheme ? `color_${list.colorTheme}_bg` : 'selected') : ''}`}>
            <span className={props.currentListId === list.id ? 'bold' : ''}>{list.listName}</span>
          </button>
      )}
    </div>
  )
}
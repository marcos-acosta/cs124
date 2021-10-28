import { useState } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import App from "../App"

export default function InMemoryApp(props) {
  const [data, setData] = useState(props.initialData);

  function setTaskProperty(id, field, value) {
    let dataCopy = data.slice();
    dataCopy.find(task => task.id === id)[field] = value;
    setData(dataCopy);
  }
  
  function deleteTask(id) {
    setData(data.filter(task => task.id !== id));
  }
  
  function clearCompleted() {
    setData(data.filter(task => !task.isCompleted));
  }
  
  function addTask() {
    const id = generateUniqueID();
    let newTask = {
      taskName: "",
      isCompleted: false,
      id: id
    }
    setData([...data, newTask]);
    return id;
  }

  return <App   setTaskProperty={setTaskProperty}
                deleteTask={deleteTask}
                clearCompleted={clearCompleted}
                addTask={addTask}
                data={data} />
}
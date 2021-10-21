export default function OptionSelector(props) {
  return <select onChange={e => props.onChangeCallback(e.target.value)}>
    {
      props.options.map((option, i) => 
        <option key={i} value={option}>{option}</option>
      )
    }
  </select>
}
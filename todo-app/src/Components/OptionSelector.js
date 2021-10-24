import "./OptionSelector.css";

export default function OptionSelector(props) {
  return <select onChange={e => props.onChangeCallback(e.target.value)} className="optionSelector">
    {
      props.options.map(([optionValue, optionName], i) => 
        <option key={i} value={optionValue}>{optionName}</option>
      )
    }
  </select>
}
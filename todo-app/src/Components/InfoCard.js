import "./InfoCard.css"

export default function InfoCard(props) {
  return (
    <div className={`infoText ${props.error ? 'errorText' : ''}`}>
      {props.error 
        ? `an unexpected error occurred: ${props.error}` 
        : 'loading...'}
    </div>
  )
}
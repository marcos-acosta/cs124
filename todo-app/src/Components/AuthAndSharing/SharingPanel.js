import React, { useState } from 'react'
import "./SharingPanel.css";

export default function SharingPanel(props) {
  const [emailInput, setEmailInput] = useState("");

  return (
    <>
    <div className="smokeScreen" />
    <div className="sharingPanelContainer">
      <button onClick={props.onClosePanel}>x</button>
      Sharing panel
      <br />
      <input onChange={e => setEmailInput(e.target.value)} value={emailInput} />
      <button onClick={() => props.addSharedEmail(emailInput)}>Share</button>
    </div>
    </>
  )
}

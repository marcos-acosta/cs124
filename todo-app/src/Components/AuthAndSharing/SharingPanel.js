import React, { useState } from 'react'
import "./SharingPanel.css";

export default function SharingPanel(props) {
  const [emailInput, setEmailInput] = useState("");

  const revokeAllPermissions = (email) => {
    props.removeFromListField(props.currentListId, "sharedWith", email);
    props.removeFromListField(props.currentListId, "admins", email);
  }

  const handlePermissionsChange = (email, value) => {
    if (value === 'admin') {
      props.addToListField(props.currentListId, "admins", email);
    } else {
      props.removeFromListField(props.currentListId, "admins", email);
    }
  }

  return (
    <>
    <div className="smokeScreen" />
    <div className="sharingPanelContainer">
      <button onClick={props.onClosePanel}>x</button>
      Sharing panel
      <br />
      <input onChange={e => setEmailInput(e.target.value)} value={emailInput} />
      <button onClick={() => props.addToListField(props.currentListId, "sharedWith", emailInput)}>Share</button>
      <br />
      Permissions
      {
        props.sharedEmails.map((email, i) => 
          <div key={i}>
            {email} {props.admins.includes(email) && <span>(admin)</span>}
            {
              props.owner !== email &&
                <>
                  <select onChange={e => handlePermissionsChange(email, e.target.value)}>
                    <option>basic</option>
                    <option>admin</option>
                  </select>
                  <button onClick={() => revokeAllPermissions(email)}>x</button>
                </>
            }
          </div>
        )
      }
    </div>
    </>
  )
}

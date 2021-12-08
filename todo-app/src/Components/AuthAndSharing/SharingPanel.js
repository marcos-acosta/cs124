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

  const handleOnInvite = () => {
    props.addToListField(props.currentListId, "pendingInvitations", emailInput);
    setEmailInput("");
  }

  return (
    <>
    <div className="smokeScreen" />
    <div className="sharingPanelContainer">
      <button onClick={props.onClosePanel} className="exitButton">×</button>
      <div className="sharingPanelBody">
        <div className="sharingPanelHeader">
          sharing
        </div>
        {props.admins.includes(props.user.email) &&
          <>
            share this list with 
            <input  onChange={e => setEmailInput(e.target.value)} 
                    placeholder="email" 
                    value={emailInput} 
                    className="inviteInput"/>
            <button onClick={() => handleOnInvite()}
                    className={`inviteButton color_${props.colorTheme}_bg`}>invite</button>
          </>
        }
        <div className="innerContainer">
          <div className="subheader">
            contributors
          </div>
          <div className="permissionsTable">
            {
              props.sharedEmails.map((email, i) => 
                <div key={i} className="permissionsRow">
                  <div>
                    <div className="emailBubble">{email}</div> {props.owner === email && <span className="ownerText">(owner)</span>}
                  </div>
                  {
                    (props.owner !== email && props.admins.includes(props.user.email)) &&
                      <>
                        <select 
                          onChange={e => handlePermissionsChange(email, e.target.value)} 
                          className="roleSelector"
                          value={props.admins.includes(email) ? "admin" : "basic"}>
                          <option>basic</option>
                          <option>admin</option>
                        </select>
                        <div className="removePersonContainer">
                          <button onClick={() => revokeAllPermissions(email)} className="removePerson">remove</button>
                        </div>
                      </>
                  }
                </div>
              )
            }
          </div>
        </div>
        <div className="innerContainer">
          {
            props.pendingInvitations.length > 0 && <>
              <div className="subheader">pending invites</div>
              {
                props.pendingInvitations.map((email, i) => 
                  <div key={i}>
                    <div className="emailBubble">{email}</div>
                  </div>)
              }
            </>
          }
        </div>
      </div>
    </div>
    </>
  )
}

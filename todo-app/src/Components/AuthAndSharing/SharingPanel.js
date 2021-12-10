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
    } else if (value === 'basic') {
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
        <div className="sharingContent">
          {props.admins.includes(props.user.email) &&
            <form onSubmit={(e) => e.preventDefault()} className="shareRow">
              <input  onChange={e => setEmailInput(e.target.value)} 
                      placeholder="invite by email" 
                      value={emailInput} 
                      className="inviteInput"/>
              <button onClick={() => handleOnInvite()}
                      className={`inviteButton color_${props.colorTheme}_bg`}>invite</button>
            </form>
          }
          <div className="innerContainer">
            <div className="subheader">
              contributors
            </div>
            <div className="permissionsTable">
              {!props.isNarrow && 
                <div className="permissionsRow">
                  <div><u>email</u></div>
                  <div><u>permissions</u></div>
                </div>
              }
              {
                props.sharedEmails.map((email, i) => 
                  props.isNarrow
                    ? <div className="narrowContributorContainer">
                        <div className="emailContainer">
                          {email}
                        </div>
                        <div className="permissionActions">
                          {props.owner !== email &&
                            <>
                              <div className="roleSelectorContainer withMargin">
                                <select 
                                  onChange={e => handlePermissionsChange(email, e.target.value)} 
                                  className="roleSelector"
                                  value={props.admins.includes(email) ? "admin" : "basic"}
                                  disabled={!props.admins.includes(props.user.email)}>
                                  <option>basic</option>
                                  <option>admin</option>
                                </select>
                              </div>
                              {
                                props.admins.includes(props.user.email) && 
                                <div className="removePersonContainer withMargin">
                                  <button onClick={() => revokeAllPermissions(email)} className="removePerson">remove</button>
                                </div>
                              }
                            </>
                          }
                        </div>
                      </div>
                    : <div key={i} className="permissionsRow">
                      <div>
                        <div className="emailBubble">{email}</div> {props.owner === email && <span className="ownerText">(owner)</span>}
                      </div>
                      {
                        props.owner !== email &&
                          <>
                            <div className="roleSelectorContainer">
                              <select 
                                onChange={e => handlePermissionsChange(email, e.target.value)} 
                                className="roleSelector"
                                value={props.admins.includes(email) ? "admin" : "basic"}
                                disabled={!props.admins.includes(props.user.email)}>
                                <option>basic</option>
                                <option>admin</option>
                              </select>
                            </div>
                            {
                              props.admins.includes(props.user.email) && 
                              <div className="removePersonContainer">
                                <button onClick={() => revokeAllPermissions(email)} className="removePerson">remove</button>
                              </div>
                            }
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
                    <div key={i} className="pendingEmailContainer">
                      <div className="emailBubble">
                        {email}
                        <button 
                          className="deletePending" 
                          onClick={() => props.removeFromListField(props.currentListId, "pendingInvitations", email)}>
                            ×
                        </button>
                      </div>
                    </div>
                  )
                }
              </>
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

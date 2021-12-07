import { useState } from "react";
import AccountIcon from "./../../images/account_icon.png"
import "./SignedInStatus.css";

export default function SignedInStatus(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="accountIconDiv" onClick={() => setIsExpanded(!isExpanded)}>
        <img src={AccountIcon} alt="account icon" className="accountIcon" />
        <div className={`expandCaretDiv ${isExpanded ? "flipped" : ""}`}>⌵</div>
      </div>
      {
        isExpanded && <div className="accountPanel">
          <div className="userEmail">
            {props.user.email}
          </div>
          {
            !props.user.emailVerified && <div>
              <button onClick={() => props.user.sendEmailVerification()} className="accountButton validateButton">confirm email</button>
            </div>
          }
          <div>
            <button onClick={() => props.auth.signOut()} className="accountButton signOutButton">sign out</button>
          </div>
        </div>
      }
      {
        !props.user.emailVerified && <div className="notification">_</div>
      }
    </div>
  )
}

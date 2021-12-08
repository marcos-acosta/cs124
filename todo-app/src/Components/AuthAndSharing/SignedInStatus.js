import { useState } from "react";
import AccountIcon from "./../../images/account_icon.png"
import "./SignedInStatus.css";

export default function SignedInStatus(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sentVerificationEmail, setSentVerificationEmail] = useState(false);

  const verifyEmailCallback = () => {
    props.user.sendEmailVerification();
    setSentVerificationEmail(true);
  }

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
              <button onClick={() => verifyEmailCallback()} className="accountButton validateButton">
                {sentVerificationEmail ? "resend verification email" : "send verification email"}
              </button>
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

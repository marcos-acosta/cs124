import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import "./UnauthenticatedPage.css";

export default function UnauthenticatedPage(props) {
  const [showLogIn, setShowLogIn] = useState(true);
  return (
    <>
      <div className="header">
        <h4>
          <span className="todo">todo</span> 🦑
        </h4>
      </div>
      <div className="centerContainer">
        <div className="authenticationContainer">
          {
            showLogIn
              ? <LogIn auth={props.auth} showSignUp={() => setShowLogIn(false)} />
              : <SignUp auth={props.auth} showLogIn={() => setShowLogIn(true)}/>
          }
        </div>
        <div className="signInSignUpSwitcher" onClick={() => setShowLogIn(!showLogIn)}>
          {
            showLogIn
              ? <>don't have an account? <u>sign up</u></>
              : <>already have an account? <u>sign in</u></>
          }
        </div>
      </div>
    </>
  )
}
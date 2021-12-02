import firebase from "firebase/compat";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import "./LogIn.css";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, userCredential, loading, error] = useSignInWithEmailAndPassword(props.auth)

  return (
    <>
      <div className="authTitle">
        log in
      </div>
      <hr />
      <form>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" type="email" className="signInInput"/>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" className="signInInput" />
        <button onClick={() => signInWithEmailAndPassword(email, password)} className="signInButton">sign in</button>
      </form>
      <hr />
      <div className="centerContainer">
        <button onClick={() => props.auth.signInWithPopup(googleProvider)} className="useGoogleButton">
          <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                className="googleLogo"/>
          sign in with google
        </button>
      </div>
    </>
  )
}
import firebase from "firebase/compat";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import "./LogIn.css";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const useSignInResponse = useSignInWithEmailAndPassword(props.auth);
  const [signInWithEmailAndPassword, loading, error] = [useSignInResponse[0], useSignInResponse[2], useSignInResponse[3]];

  return (
    <>
      <div className="authTitle">
        log in
      </div>
      <hr />
      <form onSubmit={(e) => e.preventDefault()}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" type="email" className="signInInput"/>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" className="signInInput" />
        <button type="submit" onClick={() => signInWithEmailAndPassword(email, password)} className="submitButton">sign in</button>
      </form>
      {!loading && error && <div className="errorDiv">
          {
            error.code === 'auth/invalid-email'
              ? "please provide a valid email address"
              : error.code === 'auth/internal-error'
                  ? "please re-check your username and password"
                  : error.code === 'auth/user-not-found'
                    ? "that user wasn't found; did you sign up?"
                    : error.code === 'auth/wrong-password'
                      ? "incorrect email or password"
                      : "some error occurred; please try again"
          }
        </div>
      }
      <hr />
      <div className="centerContainer">
        <button onClick={() => props.auth.signInWithPopup(googleProvider)} className="useGoogleButton">
          <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                className="googleLogo"
                alt="google logo"/>
          sign in with google
        </button>
      </div>
    </>
  )
}
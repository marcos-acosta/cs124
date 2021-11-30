import firebase from "firebase/compat";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, userCredential, loading, error] = useSignInWithEmailAndPassword(props.auth)

  return (
    <>
      <h1>Log in</h1>
      <button onClick={() => props.auth.signInWithPopup(googleProvider)}>Sign in with Google</button>
      <hr />
      {error && `${error}`}
      Email: <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
      <br />
      Password: <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <br />
      <button onClick={() => signInWithEmailAndPassword(email, password)}>Sign in</button>
    </>
  )
}
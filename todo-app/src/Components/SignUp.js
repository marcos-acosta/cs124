import { useState } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, userCredential, loading, error] = useCreateUserWithEmailAndPassword(props.auth);

  return (
    <>
      <h1>Sign up</h1>
      {error && `${error}`}
      Email: <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
      <br />
      Password: <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <br />
      <button onClick={() => createUserWithEmailAndPassword(email, password)}>Sign up</button>
    </>
  )
}
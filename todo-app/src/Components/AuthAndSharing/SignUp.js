import { useState } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const useSignInResponse = useCreateUserWithEmailAndPassword(props.auth);
  const [createUserWithEmailAndPassword, loading, error] = [useSignInResponse[0], useSignInResponse[2], useSignInResponse[3]];

  const onSignUpCallback = () => {
    if (password !== retypePassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      createUserWithEmailAndPassword(email, password);
    }
  }

  return (
    <>
      <div className="authTitle">
        sign up
      </div>
      <hr />
      <form onSubmit={(e) => e.preventDefault()}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" type="email" className="signInInput"/>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" className="signInInput" />
        <input value={retypePassword} onChange={e => setRetypePassword(e.target.value)} placeholder="retype password" type="password" className="signInInput" />
        <button className="submitButton" type="submit" onClick={() => onSignUpCallback()}>sign up</button>
      </form>
      {!loading && (error || passwordMatchError) && 
        <div className="errorDiv">
            {
              passwordMatchError
                ? "passwords do not match"
                : error.code === 'auth/invalid-email'
                    ? "please provide a valid email address"
                    : error.code === 'auth/internal-error'
                        ? "please re-check your username and password"
                        : error.code === 'auth/weak-password'
                          ? "passwords must be at least 6 characters long"
                          : "some error occurred; please try again"
            }
          </div>
      }
    </>
  )
}
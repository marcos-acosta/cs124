import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default function SignIn(props) {
  return (
    <>
      <LogIn auth={props.auth} />
      <SignUp auth={props.auth}/>
    </>
  )
}
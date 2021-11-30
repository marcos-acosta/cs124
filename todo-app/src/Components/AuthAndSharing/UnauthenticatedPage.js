import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default function UnauthenticatedPage(props) {
  return (
    <>
      <LogIn auth={props.auth} />
      <SignUp auth={props.auth}/>
    </>
  )
}
import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import App from './App';
import SignIn from './SignIn';

export default function AuthenticationLayer(props) {
  const [user, userLoading, userError] = useAuthState(props.auth);

  return (
    userLoading || userError
      ? <div>Wait...</div>
      : user
        ? <App db={props.db} auth={props.auth} user={user} />
        : <SignIn auth={props.auth} />
  )
}

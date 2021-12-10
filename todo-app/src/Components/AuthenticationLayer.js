import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import App from './App';
import UnauthenticatedPage from './AuthAndSharing/UnauthenticatedPage';
import "./AuthenticationLayer.css"

export default function AuthenticationLayer(props) {
  const [user, userLoading, userError] = useAuthState(props.auth);

  return (
    !(userLoading || userError) && <div className="minWidthContainer">
      {user
        ? <App db={props.db} auth={props.auth} user={user} />
        : <UnauthenticatedPage auth={props.auth} />}
      </div>
  )
}

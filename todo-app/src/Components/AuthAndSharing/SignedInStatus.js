export default function SignedInStatus(props) {
  return (
    <div>
      {props.user.email}
      <button onClick={() => props.auth.signOut()}>Sign out</button>
      {
        !props.user.emailVerified && <button onClick={() => props.user.sendEmailVerification()}>Validate email</button>
      }
    </div>
  )
}

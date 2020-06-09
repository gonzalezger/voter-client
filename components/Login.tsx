import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'

export default function Login() {
  const {
    isAuthenticating,
    isAuthenticated,
    handleLogin,
    handleSocialLogin,
    handleLogout,
  } = useAuth()

  const { username } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitLogin = React.useCallback(() => {
    if (!email || !password) {
      console.log('invalid credentials')
      return
    }

    handleLogin(email, password)
  }, [email, password, handleLogin])

  const handleGoogleSignIn = React.useCallback(() => {
    handleSocialLogin('google')
  }, [email, password, handleSocialLogin])

  if (isAuthenticating) return <p>Loading</p>

  if (!isAuthenticated) {
    return (
      <>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSubmitLogin}>Sign in</button>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </>
    )
  }

  return (
    <>
      {isAuthenticated && (
        <>
          <p>Hola {username}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </>
  )
}

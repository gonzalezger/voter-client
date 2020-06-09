import Login from '../components/Login'
import CreateRoom from '../components/CreateRoom'
import useAuth from '../hooks/useAuth'

export default function IndexPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div>
      <Login />
      {isAuthenticated && <CreateRoom />}
    </div>
  )
}

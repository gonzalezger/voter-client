import '../styles/index.css'
import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/Auth'
import { UserProvider } from '../contexts/User'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  )
}

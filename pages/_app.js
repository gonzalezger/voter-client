import "../styles/index.css";
import { AuthProvider } from "../contexts/Auth";
import { UserProvider } from "../contexts/User";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}

import "../styles/index.css";
import { AuthProvider } from "../contexts/Auth";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

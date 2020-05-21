import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";

type AuthProviderProps = { children: React.ReactNode };

type AuthContextState = {
  username: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
};

const AuthContext = React.createContext<AuthContextState>({
  username: "",
  isAuthenticated: false,
  isAuthenticating: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

function AuthProvider({ children }: AuthProviderProps) {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(false);

  const handleLogin = (username: string, password: string) => {
    setAuthenticating(true);

    auth
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        setUsername(username);
        setAuthenticated(true);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setAuthenticating(false);
      });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUsername("");
        setAuthenticated(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setAuthenticating(false));
  };

  const onStateChange = (user: firebase.User | null) => {
    if (user && user.email) {
      setUsername(user.email);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      setUsername('');
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onStateChange);

    // Unsubscribe to the listener when unmounting.
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        isAuthenticated,
        isAuthenticating,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

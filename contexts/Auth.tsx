import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import * as login from "../utils/auth/login";
import logout from "../utils/auth/logout";

type AuthProviderProps = { children: React.ReactNode };

type SocialSignIn = "google" | "facebook";

type AuthContextState = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  handleLogin: (email: string, password: string) => void;
  handleSocialLogin: (provider: SocialSignIn) => void;
  handleLogout: () => void;
};

const AuthContext = React.createContext<AuthContextState>({
  isAuthenticated: false,
  isAuthenticating: false,
  handleLogin: () => {},
  handleSocialLogin: () => {},
  handleLogout: () => {},
});

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setAuthenticating(true);

    login
      .signInWithEmailAndPasssword(email, password)
      .then(() => setAuthenticated(true))
      .catch((err) => console.log(err))
      .finally(() => setAuthenticating(false));
  };

  const handleSocialLogin = (type: SocialSignIn) => {
    setAuthenticating(true);

    login
      .signInSocial(type)
      .then(() => setAuthenticated(true))
      .catch((err) => console.log(err))
      .finally(() => setAuthenticating(false));
  };

  const handleLogout = () => {
    logout()
      .then(() => setAuthenticated(false))
      .catch((err) => console.log(err))
      .finally(() => setAuthenticating(false));
  };

  const onStateChange = (user: firebase.User | null) => {
    if (user && user.email) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onStateChange);

    // Unsubscribe to the listener when unmounting.
    return () => unsubscribe();
  }, []);

  const value = React.useMemo(
    () => ({
      isAuthenticated,
      isAuthenticating,
      handleLogin,
      handleSocialLogin,
      handleLogout,
    }),
    [
      isAuthenticated,
      isAuthenticating,
      handleLogin,
      handleSocialLogin,
      handleLogout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };

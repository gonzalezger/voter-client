import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";

type UserProviderProps = { children: React.ReactNode };

type UserContextState = {
  username: string;
};

const UserContext = React.createContext<UserContextState>({
  username: "",
});

function UserProvider({ children }: UserProviderProps) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        setUsername(user.email);
      } else {
        setUsername("");
      }
    });

    // Unsubscribe to the listener when unmounting.
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ username }}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };

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
      console.log(user);
      if (user && user.displayName) {
        setUsername(user.displayName);
      } else {
        setUsername("");
      }
    });

    // Unsubscribe to the listener when unmounting.
    return () => unsubscribe();
  }, []);

  const value = React.useMemo(() => ({ username }), [username]);

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };

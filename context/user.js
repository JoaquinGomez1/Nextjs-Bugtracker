import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider(props) {
  const [currentUser, setCurrentUser] = useState({
    username: "Joaquin",
    id: 1,
    role: "admin",
  });

  return (
    <UserContext.Provider {...props} value={{ currentUser, setCurrentUser }} />
  );
}

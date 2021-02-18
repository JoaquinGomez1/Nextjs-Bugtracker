import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const UserContext = createContext();

export default function UserProvider(props) {
  const { data } = useFetch(process.env.BACKEND_URL + "/user");
  const [currentUser, setCurrentUser] = useState(data || {});

  useEffect(() => {
    if (data) {
      if (data.username || !data.message) {
        setCurrentUser(data);
      }
    }
  }, [data]);

  return (
    <UserContext.Provider {...props} value={{ currentUser, setCurrentUser }} />
  );
}

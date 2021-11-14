import {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";
import useFetch from "../hooks/useFetch";
import AppResponse from "../interfaces/appResponse";
import IUser from "../interfaces/user";

interface UserProviderProps {
  currentUser?: IUser;
  setCurrentUser: Dispatch<SetStateAction<IUser | undefined | {}>>;
}

export const UserContext = createContext<UserProviderProps | null>(null);

export default function UserProvider(props: any) {
  const { data } = useFetch<IUser & AppResponse>(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/user"
  );
  const [currentUser, setCurrentUser] = useState(data || {});

  useEffect(() => {
    if (data) {
      if (data?.id || data?.message) {
        setCurrentUser(data);
      }
    }
  }, [data]);

  return (
    <UserContext.Provider {...props} value={{ currentUser, setCurrentUser }} />
  );
}

export function useUserProvider() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("Please use this hook inside of a User Provider");

  return context;
}

import { createContext, SetStateAction, Dispatch, useContext } from "react";
import useFetch from "../hooks/useFetch";
import IUser from "../interfaces/user";

interface UserProviderProps {
  currentUser?: IUser;
  setCurrentUser: Dispatch<SetStateAction<IUser | undefined | {}>>;
  isUserLoading: boolean;
}

export const UserContext = createContext<UserProviderProps | null>(null);

export default function UserProvider(props: any) {
  const {
    data: currentUser,
    setData: setCurrentUser,
    dataLoading,
  } = useFetch<IUser>("/user");

  return (
    <UserContext.Provider
      {...props}
      value={{ currentUser, setCurrentUser, isUserLoading: dataLoading }}
    />
  );
}

export function useUserProvider() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("Please use this hook inside of a User Provider");

  return context;
}

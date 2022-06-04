import { useRouter } from "next/router";
import {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
} from "react";
import useFetch from "../hooks/useFetch";
import AppResponse from "../interfaces/appResponse";
import IUser from "../interfaces/user";

interface UserProviderProps {
  currentUser?: IUser;
  setCurrentUser: Dispatch<SetStateAction<IUser | undefined | {}>>;
  isUserLoading: boolean;
  logUserOut: () => void;
  logTestAccount: () => void;
}

export const UserContext = createContext<UserProviderProps | null>(null);

export default function UserProvider(props: any) {
  const router = useRouter();
  const {
    data: currentUser,
    setData: setCurrentUser,
    dataLoading,
  } = useFetch<IUser>("/user");

  const { fetchData } = useFetch("/user/logout", { useInitialFetch: false });
  const { fetchData: makeTestAccLogin } = useFetch<AppResponse<IUser>>(
    "/user/login",
    {
      useInitialFetch: false,
    }
  );

  const logUserOut = async () => {
    setCurrentUser(undefined);
    await fetchData({ method: "get" });
    router.push("/login");
  };

  const logTestAccount = async () => {
    const { res } = await makeTestAccLogin({
      method: "POST",
      body: JSON.stringify({
        username: "admin",
        password: "admin",
      }),
    });
    setCurrentUser(res?.data);
  };

  useEffect(() => {
    // We might get a response from the server with an error message so we check if the user doesnt have an id
    if (!currentUser?.id) {
      setCurrentUser(undefined);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      {...props}
      value={{
        currentUser,
        setCurrentUser,
        isUserLoading: dataLoading,
        logUserOut,
        logTestAccount,
      }}
    />
  );
}

export function useUserProvider() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("Please use this hook inside of a User Provider");

  return context;
}

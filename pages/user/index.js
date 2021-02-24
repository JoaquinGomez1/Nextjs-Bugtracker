import { useContext, useEffect } from "react";
import { Container, Button, Typography } from "@material-ui/core";
import { UserContext } from "../../context/user";
import { useRouter } from "next/router";

import protectedRequest from "../../libs/protectedRequest";

export default function Index() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser || Object.keys(currentUser).length <= 0) {
      router.push("/login");
    }
  }, [currentUser]);

  const handleLogout = async () => {
    const req = await fetch(process.env.BACKEND_URL + "/user/logout");

    if (req.status === 200) {
      setCurrentUser({});
      router.push("/login");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3">Current User</Typography>
      <h3>{currentUser?.username}</h3>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Log Out
      </Button>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const result = await protectedRequest(ctx, "/login");

  if (!result.auth) return result;
  return { props: { result } };
}

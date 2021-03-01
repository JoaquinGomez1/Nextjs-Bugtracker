import { useContext } from "react";
import { Container, Button, Typography } from "@material-ui/core";
import { UserContext } from "../../context/user";
import { useRouter } from "next/router";

import protectedRequest from "../../libs/protectedRequest";
import { motion } from "framer-motion";
import { fadeIn } from "../../libs/animations";

const MotionContainer = motion(Container);

export default function Index() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    const req = await fetch(process.env.BACKEND_URL + "/user/logout");

    if (req.status === 200) {
      setCurrentUser({});
      router.push("/login");
    }
  };

  return (
    <MotionContainer
      variants={fadeIn}
      animate="show"
      initial="hidden"
      maxWidth="lg"
    >
      <Typography variant="h3">Current User</Typography>
      <h3>{currentUser?.username}</h3>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Log Out
      </Button>
    </MotionContainer>
  );
}

export async function getServerSideProps(ctx) {
  const result = await protectedRequest(ctx, "/login");

  if (!result.auth) return result;
  return { props: { result } };
}

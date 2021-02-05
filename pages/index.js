import { Container, Typography } from "@material-ui/core";
import Table from "../components/Table";

export default function Index() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" color="secondary">
        Welcome
      </Typography>
      <Table />
    </Container>
  );
}

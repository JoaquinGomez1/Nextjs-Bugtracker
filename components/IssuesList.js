import { useState } from "react";
import { Box, Typography, Divider, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Issue from "./Issue";
import NewIssueModal from "./NewIssueModal";
import headers from "../headers";
import Link from "next/link";

export default function IssuesList({ projectIssues, project }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [issues, setIssues] = useState(projectIssues);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSubmit = async (data) => {
    setModalOpen(false);
    setIssues([...issues, data]);

    const reqHeaders = headers;
    reqHeaders.method = "PUT";
    reqHeaders.body = JSON.stringify({ ...data, projectId: project["id"] });
    const req = await fetch(
      process.env.BACKEND_URL + "/projects/issues/new",
      reqHeaders
    );
    if (req.status === 200) return console.log("added");
  };

  return (
    <Box display="grid">
      <Box
        display="flex"
        style={{ marginBottom: "16px" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">Issues:</Typography>
        <Button onClick={handleModalOpen}>
          <AddIcon color="secondary" />
          Add Issue
        </Button>
      </Box>
      <Divider style={{ marginBottom: "16px" }} />
      <NewIssueModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
      />

      <div>
        {issues?.length <= 0 ? (
          <Typography style={{ textAlign: "center" }} variant="h6">
            There are no Issues!
          </Typography>
        ) : (
          issues?.map((issue) => (
            <Link href={`/issues/${issue.id}`} key={issue.id}>
              <a>
                <Issue issue={issue} />
              </a>
            </Link>
          ))
        )}
      </div>
    </Box>
  );
}

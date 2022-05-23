import { useState } from "react";
import { Box, Typography, Divider, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Issue from "./Issue";
import NewIssueModal from "./NewIssueModal";
import headers from "../headers";
import Link from "next/link";
import { useRouter } from "next/router";
import IssuesFilterBar from "./IssuesFilterBar";
import IProject from "../interfaces/project";
import { IIssue } from "../interfaces/issue";

interface Props {
  projectIssues: IIssue[];
  project: IProject;
}

export default function IssuesList({ projectIssues, project }: Props) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [issues, setIssues] = useState(projectIssues);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSubmit = async (data: any) => {
    setModalOpen(false);

    const reqHeaders = headers;
    reqHeaders.method = "PUT";
    reqHeaders.body = JSON.stringify({ ...data, projectId: project["id"] });
    const req = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/projects/issues/new",
      reqHeaders
    );
    const res = await req.json();

    if (req.status === 200) {
      setIssues([...issues, res?.issue[0]]);
      router.push(`/issues/${res.issue[0].id}`);
    }
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
      <IssuesFilterBar issues={projectIssues} setIssues={setIssues} />
      <Divider style={{ marginBottom: "16px" }} />
      <NewIssueModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
      />

      <div>
        {issues?.length <= 0 ? (
          <Typography
            style={{ textAlign: "center", color: "rgba(255,255,255,.6)" }}
            variant="h6"
          >
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

import { createContext, useState } from "react";

function createData(name, issues, members, actions, url) {
  return { name, issues, members, actions, url };
}

const rows = [
  createData("React App", 5, 3, 67, "/projects/cra"),
  createData("Angular App", 9, 25, 51, "/projects/caa"),
  createData("Nextjs App", 20, 16, 24, "/projects/cna"),
  createData("Vue App", 4, 16, 24, "/projects/cva"),
];

export const ProjectsContext = createContext();

export default function ProjectProvider(props) {
  const [projects, setProjects] = useState(rows);

  return (
    <ProjectsContext.Provider {...props} value={{ projects, setProjects }} />
  );
}

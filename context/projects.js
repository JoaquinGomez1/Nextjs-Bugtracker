import { createContext, useState } from "react";

function createData(name, issues, members, actions, url) {
  return { name, issues, members, actions, url };
}

const rows = [];

export const ProjectsContext = createContext();

export default function ProjectProvider(props) {
  const [projects, setProjects] = useState(rows);

  return (
    <ProjectsContext.Provider {...props} value={{ projects, setProjects }} />
  );
}

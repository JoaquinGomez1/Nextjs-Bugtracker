import { createContext, useState } from "react";

export const ProjectsContext = createContext();

export default function ProjectProvider(props) {
  const [projects, setProjects] = useState([]);

  return (
    <ProjectsContext.Provider {...props} value={{ projects, setProjects }} />
  );
}

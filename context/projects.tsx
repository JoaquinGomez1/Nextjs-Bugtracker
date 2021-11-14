import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import IProject from "../interfaces/project";

interface ProjectsProps {
  projects?: IProject[];
  setProjects: Dispatch<SetStateAction<IProject[] | undefined>>;
}

export const ProjectsContext = createContext<ProjectsProps | null>(null);

export default function ProjectProvider(props: any) {
  const [projects, setProjects] = useState<IProject[]>([]);

  return (
    <ProjectsContext.Provider {...props} value={{ projects, setProjects }} />
  );
}

export function useProjectProvider() {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error("Use this inside a Project Provider");

  return context;
}

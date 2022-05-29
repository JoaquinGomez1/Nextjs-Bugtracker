import IUser from "./user";

export default interface IProject {
  id: number;
  title: string;
  description: string;
  severity: string;
  author: number;
  projectId: number;
  project_name?: string;
  project_members?: IUser[];
  project_owner_name?: string;
  project_owner: number;
}

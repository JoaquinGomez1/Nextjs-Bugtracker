//  Issues.id, issue_name, issue_author as issue_author_id, issue_date, issue_project, issue_description, issue_severity, username as issue_author

export interface IIssue {
  id: number;
  issue_name: string;
  issue_author_id: number;
  issue_date: string;
  issue_project: string;
  issue_description: string;
  issue_severity: "low" | "medium" | "high";
  issue_author: string;
}

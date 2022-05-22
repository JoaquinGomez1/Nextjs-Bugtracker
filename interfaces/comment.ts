// comment_content, comment_issue, comment_date, comment_author as comment_author_id, username AS comment_author, Comments.id

export interface IComment {
  id: number;
  comment_content: string;
  comment_issue: number;
  comment_date: Date;
  comment_author: string;
  comment_author_id: number;
}

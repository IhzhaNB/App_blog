export interface User {
  id: string;
  username: string;
}

export interface ResponseJson<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Blog {
  id: string;
  title: string;
  article: string;
  banner: string;
  author: User;
  authorId: string;
  Comment: Comment[];
}

export interface Comment {
  id: string;
  comment: string;
  blog: Blog;
  author: User;
}

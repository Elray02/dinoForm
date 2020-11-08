import { CommentModel } from './comment.model';

export interface PostModel {
  id: number;
  title: string;
  content: string;
  author: string;
  comments: CommentModel[];
}

import { CommentModel } from './comment.model';

export interface PostModel {
  id: string;
  title: string;
  content: string;
  author: string;
  comments: CommentModel[];
}

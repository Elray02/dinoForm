import { Injectable } from '@angular/core';
import { PostModel } from './model/post.model';
import * as faker from 'faker';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { UserService } from './User.service';
import { CommentModel } from './model/comment.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  author = '';
  constructor(private userservice: UserService) {
    this.userservice.userName.subscribe((x) => (this.author = x));

    // this.postState.subscribe((x) => console.log(x));
  }

  selectedPost: Subject<PostModel> = new Subject();
  postState = new ReplaySubject<PostModel[]>(1);

  generatePost(): PostModel[] {
    const randomPost: PostModel[] = [
      ...Array.from({ length: 4 }, () => ({
        id: faker.random.uuid(),
        title: faker.lorem.words(3),
        content: faker.lorem.text(1),
        author: faker.name.firstName(),
        comments: [],
      })),
    ];
    return randomPost;
  }

  initializePost() {
    const initialPost = this.generatePost();
    this.postState.next([...initialPost]);
  }

  getPostState(): PostModel[] {
    let tempPost: PostModel[] = [];
    this.postState.subscribe((post: PostModel[]) => {
      tempPost = post;
    });
    return tempPost;
  }

  createNewPost() {
    const newPost: PostModel = {
      id: '',
      title: 'new post',
      content: '',
      comments: [],
      author: this.author,
    };
    this.selectedPost.next(newPost);
    this.postState.next([...this.getPostState(), newPost]);
  }
  updatePost(postToUpdate: PostModel) {
    if (postToUpdate.id === '') {
      const postWithId: PostModel = {
        ...postToUpdate,
        id: faker.random.uuid(),
      };
      const postListUpdated = this.getPostState().map((p: PostModel) =>
        p.id === postToUpdate.id ? postWithId : p
      );
      this.selectedPost.next(postWithId);
      return this.postState.next([...postListUpdated]);
    } else {
      const postListUpdated = this.getPostState().map((p: PostModel) => {
        return p.id === postToUpdate.id ? postToUpdate : p;
      });

      return this.postState.next([...postListUpdated]);
    }
  }

  addComment(parentPost: PostModel) {
    const newComment: CommentModel = {
      id: '',
      parentId: parentPost.id,
      author: this.author,
      text: '',
    };
    const postListUpdated = this.getPostState().map((p: PostModel) => {
      if (p.id === parentPost.id) {
        this.selectedPost.next({
          ...parentPost,
          comments: [...parentPost.comments, newComment],
        });
        return {
          ...parentPost,
          comments: [...parentPost.comments, newComment],
        };
      } else {
        return p;
      }
    });

    this.postState.next([...postListUpdated]);
  }

  updateComment(commentUPD: CommentModel) {
    const parentPost: PostModel = this.getPostState().find(
      (p) => p.id === commentUPD.parentId
    );

    if (commentUPD.id === '') {
      const newComment: CommentModel = {
        ...commentUPD,
        id: faker.random.uuid(),
      };
      const postToUpdate: PostModel = {
        ...parentPost,
        comments: parentPost.comments.map((com: CommentModel) =>
          com.id === commentUPD.id ? newComment : com
        ),
      };

      this.selectedPost.next(postToUpdate);

      const postListUpdated = this.getPostState().map((p: PostModel) => {
        return p.id === postToUpdate.id ? postToUpdate : p;
      });

      return this.postState.next([...postListUpdated]);
    } else {
      const postToUpdate: PostModel = {
        ...parentPost,
        comments: parentPost.comments.map((com: CommentModel) =>
          com.id === commentUPD.id ? commentUPD : com
        ),
      };

      const postListUpdated = this.getPostState().map((p: PostModel) => {
        return p.id === postToUpdate.id ? postToUpdate : p;
      });

      return this.postState.next([...postListUpdated]);
    }
  }
}

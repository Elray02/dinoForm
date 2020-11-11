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
    // get the current user nickname
    this.userservice.userName.subscribe((x) => (this.author = x));
  }
  // variable to store the post to display
  selectedPost: Subject<PostModel> = new Subject();
  // container of the state of all the posts
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
    // create some fake post
    const initialPost = this.generatePost();
    // update the state with the new value
    this.postState.next([...initialPost]);
  }

  // selector of the state to use it as array
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
    // once created a new post update the selected post for the UI
    // and update the general state
    this.selectedPost.next(newPost);
    this.postState.next([...this.getPostState(), newPost]);
  }

  updatePost(postToUpdate: PostModel) {
    if (postToUpdate.id === '') {
      // if the post id is null need to have an id
      const postWithId: PostModel = {
        ...postToUpdate,
        id: faker.random.uuid(),
      };
      // get from the state the post to update and give to it the new value
      const postListUpdated = this.getPostState().map((p: PostModel) =>
        p.id === postToUpdate.id ? postWithId : p
      );
      // update the value in the UI
      this.selectedPost.next(postWithId);
      // update the state with the updated list
      return this.postState.next([...postListUpdated]);
    } else {
      // get from the state the post to update and give to it the new value
      const postListUpdated = this.getPostState().map((p: PostModel) => {
        return p.id === postToUpdate.id ? postToUpdate : p;
      });
      // update the state with the updated list
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
    // search in the state the reference post and add the new comment
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

    // update the state with the updated list
    this.postState.next([...postListUpdated]);
  }

  updateComment(commentUPD: CommentModel) {
    // get from the state the post parent
    const parentPost: PostModel = this.getPostState().find(
      (p) => p.id === commentUPD.parentId
    );

    if (commentUPD.id === '') {
      // if the comment id is null need to have an id
      const newComment: CommentModel = {
        ...commentUPD,
        id: faker.random.uuid(),
      };
      // update the comment
      const postToUpdate: PostModel = {
        ...parentPost,
        comments: parentPost.comments.map((com: CommentModel) =>
          com.id === commentUPD.id ? newComment : com
        ),
      };
      // update the value in the UI
      this.selectedPost.next(postToUpdate);

      // get from the state the post to update and give to it the new value
      const postListUpdated = this.getPostState().map((p: PostModel) => {
        return p.id === postToUpdate.id ? postToUpdate : p;
      });
      // update the state with the updated list
      return this.postState.next([...postListUpdated]);
    } else {
      // update the comment
      const postToUpdate: PostModel = {
        ...parentPost,
        comments: parentPost.comments.map((com: CommentModel) =>
          com.id === commentUPD.id ? commentUPD : com
        ),
      };
      // get from the state the post to update and give to it the new value
      const postListUpdated = this.getPostState().map((p: PostModel) => {
        return p.id === postToUpdate.id ? postToUpdate : p;
      });
      // update the state with the updated list
      return this.postState.next([...postListUpdated]);
    }
  }
}

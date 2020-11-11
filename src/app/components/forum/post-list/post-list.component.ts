import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PostModel } from '../../../model/post.model';
import { PostService } from '../../../post.service';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() postList: PostModel[] = [];
  userNickName: Observable<string>;
  author = '';

  selectedPost: Subject<PostModel>;
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    // get from the store the value of the nickname and the selected post
    this.userNickName = this.userService.userName;
    this.selectedPost = this.postService.selectedPost;
  }

  viewPost(post: PostModel) {
    if (post) {
      // update the selected post in the store
      this.postService.selectedPost.next(post);
    }
  }
  newPost() {
    // call the store for create a new post
    this.postService.createNewPost();
  }
}

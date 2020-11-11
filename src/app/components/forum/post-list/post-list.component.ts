import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PostModel } from 'src/app/model/post.model';
import { PostService } from 'src/app/post.service';
import { UserService } from 'src/app/User.service';

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
    this.userNickName = this.userService.userName;
    this.selectedPost = this.postService.selectedPost;
  }

  viewPost(post: PostModel) {
    if (post) {
      this.postService.selectedPost.next(post);
    }
  }
  newPost() {
    this.postService.createNewPost();
  }
}

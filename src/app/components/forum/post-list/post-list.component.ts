import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PostModel } from 'src/app/model/post.model';
import { PostService } from 'src/app/post.service';
import { UserService } from 'src/app/UserService.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  userNickName: Subject<string>;
  postList: PostModel[];
  selectedPost: PostModel;
  constructor(
    private userservice: UserService,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    this.userNickName = this.userservice.userName;
    this.postList = this.postService.generatePost();
  }

  viewPost(post: PostModel) {
    this.selectedPost = post;
  }
  newPost() {
    console.log('create a new post');
  }
}

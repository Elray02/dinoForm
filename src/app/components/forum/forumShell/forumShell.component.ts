import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PostModel } from 'src/app/model/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-forumShell',
  templateUrl: './forumShell.component.html',
  styleUrls: ['./forumShell.component.scss'],
})
export class ForumShellComponent implements OnInit {
  postList$: Observable<PostModel[]>;

  constructor(private postService: PostService) {
    this.postService.initializePost();
  }

  ngOnInit() {
    this.postList$ = this.postService.postState.asObservable();
  }
}

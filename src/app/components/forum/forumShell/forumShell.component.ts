import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PostModel } from '../../../model/post.model';
import { PostService } from '../../../post.service';

@Component({
  selector: 'app-forumShell',
  templateUrl: './forumShell.component.html',
  styleUrls: ['./forumShell.component.scss'],
})
export class ForumShellComponent implements OnInit {
  postList$: Observable<PostModel[]>;

  constructor(private postService: PostService) {
    // call the state for populate the list with some fake value
    this.postService.initializePost();
  }

  ngOnInit() {
    // get the new created list
    this.postList$ = this.postService.postState.asObservable();
  }
}

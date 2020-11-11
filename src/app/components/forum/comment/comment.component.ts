import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { PostService } from '../../../post.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommentModel } from '../../../model/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() inputComment: CommentModel;
  public Editor = ClassicEditor;
  constructor(private postService: PostService) {}

  save(comment: CommentModel) {
    this.postService.updateComment(comment);
  }
}

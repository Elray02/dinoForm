import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostModel } from 'src/app/model/post.model';
import { PostService } from 'src/app/post.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/User.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  postSelected: Observable<PostModel | null>;
  pageTitle = '';
  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!</p>',
  };
  postForm: FormGroup;
  userNickName: Observable<string>;
  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    // get the current selected product from the state
    this.postSelected = this.postService.selectedPost.pipe(
      tap((currentPost) => this.displayProduct(currentPost))
    );
    // get the actual nickname
    this.userNickName = this.userService.userName;
    // Init the form
    this.postForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      content: '',
    });
  }

  displayProduct(post: PostModel | null): void {
    if (post) {
      // Reset the form back to pristine
      this.postForm.reset();

      // Display the appropriate page title
      if (post.id === '') {
        this.pageTitle = 'Create a new Post';
      } else {
        this.pageTitle = `Edit a Post: ${post.title}`;
      }

      // Update the data on the form
      this.postForm.patchValue({
        title: post.title,
        content: post.content,
      });
    }
  }

  savePost(post: PostModel) {
    // update the info in the post
    const changedPost: PostModel = { ...post, ...this.postForm.value };
    // dispatch the action to update the store
    this.postService.updatePost(changedPost);
  }

  addComment(post: PostModel) {
    // dispatch the action to add in the store a new comment
    // we pass the post as reference
    this.postService.addComment(post);
  }
}

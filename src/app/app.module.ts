import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserNameComponent } from './components/userName/userName.component';
import { PostListComponent } from './components/forum/post-list/post-list.component';
import { ForumShellComponent } from './components/forum/forumShell/forumShell.component';
import { PostDetailComponent } from './components/forum/post-detail/post-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/forum/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    UserNameComponent,
    PostListComponent,
    ForumShellComponent,
    PostDetailComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

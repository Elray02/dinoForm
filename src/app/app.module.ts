import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserNameComponent } from './components/userName/userName.component';
import { PostListComponent } from './components/forum/post-list/post-list.component';

@NgModule({
  declarations: [AppComponent, UserNameComponent, PostListComponent],
  imports: [BrowserModule, NgbModule, CKEditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

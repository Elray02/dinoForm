import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, CKEditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

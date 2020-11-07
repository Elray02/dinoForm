import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserNameComponent } from './userName/userName.component';

@NgModule({
  declarations: [	AppComponent,
      UserNameComponent
   ],
  imports: [BrowserModule, NgbModule, CKEditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

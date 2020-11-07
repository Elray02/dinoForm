import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subject } from 'rxjs';
import { UserService } from './UserService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dinoForm';
  public Editor = ClassicEditor;
  userNickName: Subject<string>;
  constructor(private userservice: UserService) {}
  ngOnInit(): void {
    this.userNickName = this.userservice.userName;
  }
}

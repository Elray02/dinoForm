import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { UserService } from './User.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dinoForm';
  userNickName: Subject<string>;
  constructor(private userservice: UserService) {}
  ngOnInit(): void {
    this.userNickName = this.userservice.userName;
  }
}

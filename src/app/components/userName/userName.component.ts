import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-userName',
  templateUrl: './userName.component.html',
  styleUrls: ['./userName.component.scss'],
})
export class UserNameComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}
  updateUserName(newNik: string) {
    if (newNik) {
      this.userService.userName.next(newNik);
    }
  }
}

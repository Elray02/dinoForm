import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userName: BehaviorSubject<string> = new BehaviorSubject(undefined);
  constructor() {}
}

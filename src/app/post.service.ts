import { Injectable } from '@angular/core';
import { PostModel } from './model/post.model';
import * as faker from 'faker';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor() {}

  generatePost(): PostModel[] {
    const randomPost: PostModel[] = [
      ...Array.from({ length: 4 }, () => ({
        id: faker.random.number(10),
        title: faker.lorem.words(3),
        content: faker.lorem.text(1),
        author: faker.name.firstName(),
        comments: [],
      })),
    ];
    return randomPost;
  }
}

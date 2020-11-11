/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ForumShellComponent } from './forumShell.component';

describe('ForumShellComponent', () => {
  let component: ForumShellComponent;
  let fixture: ComponentFixture<ForumShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

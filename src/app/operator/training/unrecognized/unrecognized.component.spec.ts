/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UnrecognizedComponent } from './unrecognized.component';

describe('UnrecognizedComponent', () => {
  let component: UnrecognizedComponent;
  let fixture: ComponentFixture<UnrecognizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnrecognizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnrecognizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

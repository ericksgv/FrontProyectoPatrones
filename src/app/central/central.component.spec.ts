/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CentralComponent } from './central.component';

describe('CentralComponent', () => {
  let component: CentralComponent;
  let fixture: ComponentFixture<CentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinapplicationComponent } from './checkinapplication.component';

describe('CheckinapplicationComponent', () => {
  let component: CheckinapplicationComponent;
  let fixture: ComponentFixture<CheckinapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinapplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

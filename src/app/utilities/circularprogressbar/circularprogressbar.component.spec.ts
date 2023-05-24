import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularprogressbarComponent } from './circularprogressbar.component';

describe('CircularprogressbarComponent', () => {
  let component: CircularprogressbarComponent;
  let fixture: ComponentFixture<CircularprogressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularprogressbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularprogressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

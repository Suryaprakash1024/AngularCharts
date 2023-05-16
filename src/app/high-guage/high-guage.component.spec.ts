import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighGuageComponent } from './high-guage.component';

describe('HighGuageComponent', () => {
  let component: HighGuageComponent;
  let fixture: ComponentFixture<HighGuageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighGuageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighGuageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

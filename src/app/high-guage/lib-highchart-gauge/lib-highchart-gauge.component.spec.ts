import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibHighchartGaugeComponent } from './lib-highchart-gauge.component';

describe('LibHighchartGaugeComponent', () => {
  let component: LibHighchartGaugeComponent;
  let fixture: ComponentFixture<LibHighchartGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibHighchartGaugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibHighchartGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

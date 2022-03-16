import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidesectionComponent } from './sidesection.component';

describe('SidesectionComponent', () => {
  let component: SidesectionComponent;
  let fixture: ComponentFixture<SidesectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidesectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

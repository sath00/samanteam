import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusfeedbackComponent } from './cusfeedback.component';

describe('CusfeedbackComponent', () => {
  let component: CusfeedbackComponent;
  let fixture: ComponentFixture<CusfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CusfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

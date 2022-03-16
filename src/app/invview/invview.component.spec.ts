import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvviewComponent } from './invview.component';

describe('InvviewComponent', () => {
  let component: InvviewComponent;
  let fixture: ComponentFixture<InvviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

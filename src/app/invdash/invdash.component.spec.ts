import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvdashComponent } from './invdash.component';

describe('InvdashComponent', () => {
  let component: InvdashComponent;
  let fixture: ComponentFixture<InvdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

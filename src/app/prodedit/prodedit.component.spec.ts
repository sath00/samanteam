import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdeditComponent } from './prodedit.component';

describe('ProdeditComponent', () => {
  let component: ProdeditComponent;
  let fixture: ComponentFixture<ProdeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

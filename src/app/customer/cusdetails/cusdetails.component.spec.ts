import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusdetailsComponent } from './cusdetails.component';

describe('CusdetailsComponent', () => {
  let component: CusdetailsComponent;
  let fixture: ComponentFixture<CusdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CusdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

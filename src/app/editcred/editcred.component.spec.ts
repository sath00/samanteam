import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcredComponent } from './editcred.component';

describe('EditcredComponent', () => {
  let component: EditcredComponent;
  let fixture: ComponentFixture<EditcredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

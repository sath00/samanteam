import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusnavComponent } from './cusnav.component';

describe('CusnavComponent', () => {
  let component: CusnavComponent;
  let fixture: ComponentFixture<CusnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CusnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

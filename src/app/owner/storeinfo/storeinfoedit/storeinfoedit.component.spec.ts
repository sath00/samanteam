import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreinfoeditComponent } from './storeinfoedit.component';

describe('StoreinfoeditComponent', () => {
  let component: StoreinfoeditComponent;
  let fixture: ComponentFixture<StoreinfoeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreinfoeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreinfoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

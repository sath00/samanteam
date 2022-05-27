import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreinfoComponent } from './storeinfo.component';

describe('StoreinfoComponent', () => {
  let component: StoreinfoComponent;
  let fixture: ComponentFixture<StoreinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

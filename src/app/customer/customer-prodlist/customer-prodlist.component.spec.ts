import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProdlistComponent } from './customer-prodlist.component';

describe('CustomerProdlistComponent', () => {
  let component: CustomerProdlistComponent;
  let fixture: ComponentFixture<CustomerProdlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProdlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

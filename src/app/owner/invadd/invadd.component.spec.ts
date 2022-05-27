import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvaddComponent } from './invadd.component';



describe('InvaddComponent', () => {
  let component: InvaddComponent;
  let fixture: ComponentFixture<InvaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

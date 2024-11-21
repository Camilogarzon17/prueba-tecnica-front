import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfUserComponent } from './inf-user.component';

describe('InfUserComponent', () => {
  let component: InfUserComponent;
  let fixture: ComponentFixture<InfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

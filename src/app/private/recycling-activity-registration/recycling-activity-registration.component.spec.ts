import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingActivityRegistrationComponent } from './recycling-activity-registration.component';

describe('RecyclingActivityRegistrationComponent', () => {
  let component: RecyclingActivityRegistrationComponent;
  let fixture: ComponentFixture<RecyclingActivityRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecyclingActivityRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecyclingActivityRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

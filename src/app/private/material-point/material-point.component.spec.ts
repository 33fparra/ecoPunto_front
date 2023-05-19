import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPointComponent } from './material-point.component';

describe('MaterialPointComponent', () => {
  let component: MaterialPointComponent;
  let fixture: ComponentFixture<MaterialPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

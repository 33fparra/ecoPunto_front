import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingPointsSearchComponent } from './recycling-points-search.component';

describe('RecyclingPointsSearchComponent', () => {
  let component: RecyclingPointsSearchComponent;
  let fixture: ComponentFixture<RecyclingPointsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecyclingPointsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecyclingPointsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

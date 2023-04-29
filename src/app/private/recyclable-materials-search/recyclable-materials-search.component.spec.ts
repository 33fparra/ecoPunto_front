import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclableMaterialsSearchComponent } from './recyclable-materials-search.component';

describe('RecyclableMaterialsSearchComponent', () => {
  let component: RecyclableMaterialsSearchComponent;
  let fixture: ComponentFixture<RecyclableMaterialsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecyclableMaterialsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecyclableMaterialsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

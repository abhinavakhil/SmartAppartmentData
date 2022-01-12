import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentListItemComponent } from './apartment-list-item.component';

describe('ApartmentListItemComponent', () => {
  let component: ApartmentListItemComponent;
  let fixture: ComponentFixture<ApartmentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

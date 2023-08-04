import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuaranceTypeComponent } from './insuarance-type.component';

describe('InsuaranceTypeComponent', () => {
  let component: InsuaranceTypeComponent;
  let fixture: ComponentFixture<InsuaranceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuaranceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuaranceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

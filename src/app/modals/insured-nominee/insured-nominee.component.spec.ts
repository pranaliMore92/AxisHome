import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredNomineeComponent } from './insured-nominee.component';

describe('InsuredNomineeComponent', () => {
  let component: InsuredNomineeComponent;
  let fixture: ComponentFixture<InsuredNomineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuredNomineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

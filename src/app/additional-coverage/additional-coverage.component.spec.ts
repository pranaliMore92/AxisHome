import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalCoverageComponent } from './additional-coverage.component';

describe('AdditionalCoverageComponent', () => {
  let component: AdditionalCoverageComponent;
  let fixture: ComponentFixture<AdditionalCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

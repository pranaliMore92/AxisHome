import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCoverageComponent } from './basic-coverage.component';

describe('BasicCoverageComponent', () => {
  let component: BasicCoverageComponent;
  let fixture: ComponentFixture<BasicCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

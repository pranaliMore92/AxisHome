import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecustpaymentlinkComponent } from './homecustpaymentlink.component';

describe('HomecustpaymentlinkComponent', () => {
  let component: HomecustpaymentlinkComponent;
  let fixture: ComponentFixture<HomecustpaymentlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecustpaymentlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecustpaymentlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

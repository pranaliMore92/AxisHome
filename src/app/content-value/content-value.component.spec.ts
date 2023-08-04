import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentValueComponent } from './content-value.component';

describe('ContentValueComponent', () => {
  let component: ContentValueComponent;
  let fixture: ComponentFixture<ContentValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

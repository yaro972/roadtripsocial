import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedCountryFormComponent } from './visited-country-form.component';

describe('VisitedCountryFormComponent', () => {
  let component: VisitedCountryFormComponent;
  let fixture: ComponentFixture<VisitedCountryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitedCountryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitedCountryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

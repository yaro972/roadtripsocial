import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraDetailsFormComponent } from './extra-details-form.component';

describe('VisitedCountryFormComponent', () => {
  let component: ExtraDetailsFormComponent;
  let fixture: ComponentFixture<ExtraDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraDetailsFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

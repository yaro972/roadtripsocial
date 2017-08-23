import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilityFormComponent } from './civility-form.component';

describe('CivilityFormComponent', () => {
  let component: CivilityFormComponent;
  let fixture: ComponentFixture<CivilityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CivilityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

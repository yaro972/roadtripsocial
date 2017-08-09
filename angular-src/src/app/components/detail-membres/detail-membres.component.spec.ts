import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMembresComponent } from './detail-membres.component';

describe('DetailMembresComponent', () => {
  let component: DetailMembresComponent;
  let fixture: ComponentFixture<DetailMembresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMembresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMembresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

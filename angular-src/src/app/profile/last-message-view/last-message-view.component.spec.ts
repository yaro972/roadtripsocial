import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMessageViewComponent } from './last-message-view.component';

describe('LastMessageViewComponent', () => {
  let component: LastMessageViewComponent;
  let fixture: ComponentFixture<LastMessageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastMessageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMessageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

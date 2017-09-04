import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsDemandComponent } from './friends-demand.component';

describe('FriendsDemandComponent', () => {
  let component: FriendsDemandComponent;
  let fixture: ComponentFixture<FriendsDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

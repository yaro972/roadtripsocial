import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShowImagePipe } from './../../show-images/pipes/show-image.pipe';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

import { JsonPipe } from '@angular/common';

@Component({
  selector: 'rts-friends-connected',
  templateUrl: './friends-connected.component.html',
  styleUrls: ['./friends-connected.component.css']
})
export class FriendsConnectedComponent implements OnInit, OnDestroy {
  userDetails: any;
  friends: any;

  subMemberDetails: Subscription;
  @Input() userId;
  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.subMemberDetails = this._authService
      .memberdetails(this.userId)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.userDetails = data.memberDetails;
          this.friends = this.userDetails.friendsList;
          console.log(this.userDetails)
        }
      });
  }

  ngOnDestroy() {
    if (this.subMemberDetails) {
      this.subMemberDetails.unsubscribe();
      this.subMemberDetails = null;
    }
  }
}

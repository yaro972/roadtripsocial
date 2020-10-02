import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs/Subscription';

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

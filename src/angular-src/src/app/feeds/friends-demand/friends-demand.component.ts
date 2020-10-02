import {Component, OnDestroy, OnInit} from '@angular/core';


import {Subscription} from 'rxjs/Subscription';

import {Router} from '@angular/router';

import {AuthService} from '../../services/auth/auth.service';


@Component({
  selector: 'rts-friends-demand',
  templateUrl: './friends-demand.component.html',
  styleUrls: ['./friends-demand.component.css']
})
export class FriendsDemandComponent implements OnInit, OnDestroy {

  nbWaitingDemands: Number;
  subshowWaitingFriendsDemand: Subscription;

  subShowWaitingFriendsDemand: Subscription;
  subAcceptDemand: Subscription;
  subRefusedDemand: Subscription;
  subNbWaintingFriendDemand: Subscription;
  ownId: String;

  waitingfriendListDemands: Array<any> = [];

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.ownId = this._authService.getOwnId();
    this.getWaitingDemands();

    this.subNbWaintingFriendDemand = this._authService.nbWaintingFriendDemand(this.ownId).subscribe(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.nbWaitingDemands = data.nbWaiting;
      }
    });
  }

  getWaitingDemands() {
    this.subshowWaitingFriendsDemand = this._authService.showWaitingFriendsDemand(this.ownId).subscribe(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.waitingfriendListDemands = data.demands;
      }
    });
  }

  onShowDetail(index) {
    const selectedUserDemand = this.waitingfriendListDemands[index];
    let userId = '';

    if (selectedUserDemand.friendsList[0]._id !== this.ownId) {
      userId = selectedUserDemand.friendsList[0]._id;
    }
    if (selectedUserDemand.friendsList[1]._id !== this.ownId) {
      userId = selectedUserDemand.friendsList[1]._id;
    }

    this._router.navigate(['/details-membres', userId]);

  }
  onClickAccept(index) {
    this.subAcceptDemand =
      this._authService
        .acceptDemand(this.waitingfriendListDemands[index])
        .subscribe(data => {
          if (data.err) {
            console.log(data.err);
          } else {
            this.getWaitingDemands();
          }
        });
  }
  onClickRefused(index) {
    this.subRefusedDemand =
      this._authService
        .refusedDemand(this.waitingfriendListDemands[index])
        .subscribe(data => {
          if (data.err) {
            console.log(data.err);
          } else {
            this.getWaitingDemands();
          }
        });
  }

  ngOnDestroy() {
    if (this.subshowWaitingFriendsDemand) {
      this.subshowWaitingFriendsDemand.unsubscribe();
      this.subshowWaitingFriendsDemand = null;
    }
    if (this.subAcceptDemand) {
      this.subAcceptDemand.unsubscribe();
      this.subAcceptDemand = null;
    }
    if (this.subRefusedDemand) {
      this.subRefusedDemand.unsubscribe();
      this.subRefusedDemand = null;
    }
    if (this.subNbWaintingFriendDemand) {
      this.subNbWaintingFriendDemand.unsubscribe();
      this.subNbWaintingFriendDemand = null;
    }

  }
}

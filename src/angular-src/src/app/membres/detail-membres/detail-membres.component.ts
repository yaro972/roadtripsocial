import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';

import {User} from '../../core/user';

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'rts-detail-membres',
  templateUrl: './detail-membres.component.html',
  styleUrls: ['./detail-membres.component.css']
})
export class DetailMembresComponent implements OnInit, OnDestroy {
  user: User;

  suivi: Boolean;
  isOwnProfile: Boolean;
  getUserProfile: Boolean;
  subGetProfile: Subscription;

  // Connexions Ajax actives
  sub: any;
  subRoute: any;
  subGetMember: any;

  // Référence de l'utilisateur
  id: String;
  ownerId: String;

  isPostActive: Boolean;

  constructor(
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.isOwnProfile = false;
  }
  ngOnInit() {
    this.getUserProfile = false;
    this.getUserId();
    this.isPostActive = false;
  }


  getUserId() {
    this.subRoute = this._route.params.subscribe(params => {
      this.id = params['id'];
      this.ownerId = this.id;
      this.getUserDetails(this.id);
    });
  }

  getUserDetails(id) {
    this.subGetMember = this._authService
      .memberdetails(id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.user = data.memberDetails;
          this.getUserProfile = true;
          this.isFriend(this.user);
        }
      });
  }

  isFriend(u) {
    const ownId = this._authService.getOwnId();

    // if (this.user._id !== this._authService.getOwnId()) {
    //   this.subGetProfile = this._authService
    //     .memberdetails(this._authService.getOwnId())
    //     .subscribe(data => {
    //       if (data.err) {
    //         console.log(data.err);
    //       } else {
    let follow = false;

    for (let i = 0; i < u.friendsList.length; i++) {
      if (u.friendsList[i]._id === ownId) {
        follow = true;
      }
    }

    this.suivi = follow;

    //   }
    // });
    // }
  }

  postActiveMode() {
    this.isPostActive = true;
  }

  profilActiveMode() {
    this.isPostActive = false;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }

    if (this.subRoute) {
      this.subRoute = null;
    }

    if (this.subGetMember) {
      this.subGetMember = null;
    }

    if (this.subGetProfile) {
      this.subGetProfile.unsubscribe();
      this.subGetProfile = null;
    }
  }
}

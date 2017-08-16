import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';

import { User } from '../../core/user';
import { PostViewComponent } from '../post-view/post-view.component';


@Component({
  selector: 'rts-detail-membres',
  templateUrl: './detail-membres.component.html',
  styleUrls: ['./detail-membres.component.css']
})
export class DetailMembresComponent implements OnInit, OnDestroy {
  user: User;
  suivi: false;
  isOwnProfile: Boolean;
  getUserProfile: Boolean;

  sub: any;
  subRoute: any;
  subGetMember: any;
  id: String;
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
    this.isPostActive = true;


    // if (this._authService.loggedIn()) {
    //   this.sub = this._authService.getProfile().subscribe(profile => {
    //     this.user = profile.user;
    //     this.addFakeData();

    //     this._authService.changeUserEvent(this.user);
    //     this._authService.closeSubMenu(true);
    //   },
    //     err => {
    //       console.log(err);
    //       return false;
    //     });
    // }
  }


  getUserId() {

    this.subRoute = this._route.params.subscribe(params => {
      this.id = params['id'];

      this.getUserDetails(this.id);
    });
  }

  getUserDetails(id) {
    this.subGetMember = this._authService.memberdetails(id).subscribe(data => {
      if (data.err) {
        console.log(data.err);
      } else {

        this.user = data.memberDetails;
        this.getUserProfile = true;

        this.addFakeData();
      }
    });
  }

  lastPostMessage: String = 'Canada is the Best country ever !';


  profileImg = 'https://randomuser.me/api/portraits/men/80.jpg';
  profileFriendsList = [{
    name: 'Joe',
    imgProfile: 'https://randomuser.me/api/portraits/men/81.jpg',
    link: ''
  },
  {
    name: 'Jack',
    imgProfile: 'https://randomuser.me/api/portraits/men/82.jpg',
    link: ''
  },
  {
    name: 'Duke',
    imgProfile: 'https://randomuser.me/api/portraits/men/83.jpg',
    link: ''
  },
  {
    name: 'Elton',
    imgProfile: 'https://randomuser.me/api/portraits/men/84.jpg',
    link: ''
  }
  ];

  /*
  => https://randomuser.me/
  "picture": {
          "large": "https://randomuser.me/api/portraits/men/83.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/83.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/83.jpg"
        },
  */

  postActiveMode() {
    this.isPostActive = true;
  }

  profilActiveMode() {
    this.isPostActive = false;
  }

  addFakeData() {

    this.user.friendsList = this.profileFriendsList;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.subRoute) {
      this.subRoute.unsubscribe();
    }

    if (this.subGetMember) {
      this.subGetMember.unsubscribe();
    }
  }
}

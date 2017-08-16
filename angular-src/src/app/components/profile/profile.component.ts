import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/user';
import { ProfileEditService } from './../../services/profile-edit/profile-edit.service';


@Component({
  selector: 'rts-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  suivi: false;
  isOwnProfile: Boolean;
  sub: any;
  onSave: Boolean;

  isOnModif: Boolean;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _editService: ProfileEditService
  ) {
    this.isOwnProfile = true;
  }
  ngOnInit() {
    this.isOnModif = false;
    this._editService.onSaveEvent(false);
    // this.onSave = false;

    let u = localStorage.getItem('user');
    if (u && u !== 'undefined') {
      this.user = JSON.parse(u);
    }
    this.addFakeData();
    this._authService.closeSubMenu(false);
    // if (this._authService.loggedIn()) {
    //   this.sub = this._authService.getProfile().subscribe(profile => {
    //     this.user = profile.user;
    //     this.addFakeData();
    //
    //     this._authService.changeUserEvent(this.user);
    //     this._authService.closeSubMenu(false);
    //   },
    //     err => {
    //       console.log(err);
    //       return false;
    //     });
    // }
  }


  modify() {
    this.isOnModif = true;
  }

  reset() {
    this.isOnModif = false;
  }

  save() {
    this.onSave = true;
    this._editService.onSaveEvent(true);
    this.isOnModif = false;
  }

  loadNewUser($event) {
    this.user = $event;
  }

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


  addFakeData() {
    this.user.friendsList = this.profileFriendsList;
  }


  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

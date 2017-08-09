import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/user';

@Component({
  selector: 'rts-detail-membres',
  templateUrl: './detail-membres.component.html',
  styleUrls: ['./detail-membres.component.css']
})
export class DetailMembresComponent implements OnInit, OnDestroy {
  user: User;
  suivi: false;
  isOwnProfile: Boolean;
  sub: any;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
    this.isOwnProfile = false;
  }
  ngOnInit() {
    if (this._authService.loggedIn()) {
      this.sub = this._authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.addFakeData();

        this._authService.changeUserEvent(this.user);
        this._authService.closeSubMenu(true);
      },
        err => {
          console.log(err);
          return false;
        });
    }
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


  addFakeData() {

    this.user.friendsList = this.profileFriendsList;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

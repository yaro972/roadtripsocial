import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { User } from '../../core/user';

import { FlashMessagesService } from 'angular2-flash-messages';


import { AuthService } from '../../services/auth/auth.service';
import { AuthGuard } from '../../guard/auth.guard';
import { Subscription } from 'rxjs/Subscription';
import { environment } from './../../../environments/environment';
import { SendMessageService } from './../../feeds/service/send-message.service';

@Component({
  selector: 'rts-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, OnDestroy, AfterContentChecked {

  collapseSubMen: Boolean;
  logo = 'assets/images/earth_globe.png';
  isCollapse = true;
  isCollapseSubmenu = false;
  imageFace: String = '';
  public user: User;
  authService: AuthService;
  isLogged = false;

  nbUnreadPosts: Number;
  subGetUnreadMessages: any;
  sub: any;
  isNewMessage: Boolean;

  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService,
    private _sendMessageService: SendMessageService
  ) {

    this.collapseSubMen = this._authService.collapseSubMen;

    // this.nbUnreadPosts = 42;
  }

  ngOnInit() {
    this.isCollapseSubmenu = true;

    const userProfile = localStorage.getItem('user');

    if (userProfile && userProfile !== 'undefined') {
      this.user = JSON.parse(userProfile);

      if (this.user.avatar) {
        this.imageFace = environment.BACKENDURL + '/api/display-photo/' + this.user.avatar;
      } else {
        this.imageFace = 'Anonymous.png';
      }
    }
    // this.unreadMessages = false;

    // this.nbUnreadPosts = 0;
    this.isunreadMessage();
  }

  /**
   * Déconnexion de l'utilisateur
   */
  onLogoutClick() {
    this._authService.logout();
    this._flashMessage.grayOut(true);
    this._flashMessage.show('Vous êtes maintenant déconnecté', {
      cssClass: 'alert-success text-center',
      timeout: 1500
    });
    this._router.navigate(['/']);
  }

  /**
   * Réc
   */
  onCollapseSubmenu() {
    this.isCollapseSubmenu = !this.isCollapseSubmenu;
  }

  /**
   * Vérifie si tous les messages ont été lus
   */
  isunreadMessage(): void {
    const userProfile = JSON.parse(localStorage.getItem('user'))
    let userId;

    if (userProfile) {
      userId = JSON.parse(localStorage.getItem('user'))._id;


      this.subGetUnreadMessages = this._authService
        .getUnreadMessages(userId)
        .subscribe(data => {
          if (data.err) {
            console.log(data.err);
            this.nbUnreadPosts = -1;
          } else {
            this.nbUnreadPosts = data.nbUnread;
            if (this.nbUnreadPosts > 0) {
              this.isNewMessage = true;
            } else {
              this.isNewMessage = false;
            }
          }
        });

    }

  }

  showUnreadMessage() {
    this._sendMessageService.showMessagerie();
  }

  ngAfterContentChecked() {
    const userProfile = localStorage.getItem('user');

    if (userProfile && userProfile !== 'undefined') {
      this.user = JSON.parse(userProfile);

      if (this.user.avatar) {
        this.imageFace = environment.BACKENDURL + '/api/display-photo/' + this.user.avatar;
      } else {
        this.imageFace = 'Anonymous.png';
      }
    }
  }

  /**
   * Destruction de la vue
   */
  ngOnDestroy() {
    if (this.subGetUnreadMessages) {
      this.subGetUnreadMessages.unsubscribe();
      this.subGetUnreadMessages = null;
    }
  }
}

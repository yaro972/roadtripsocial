import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

import {SendMessageService} from '../service/send-message.service';

@Component({
  selector: 'rts-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit, OnDestroy {

  subSendMessageService: any;
  nbUnreadPosts: Number;
  nbWaitingDemands: Number;
  nbWaitingFriend: Number;

  subGetUnreadMessages: any;
  subIsWaitingDemands: any;
  isNewMessage: Boolean;
  isWaitingDemand: Boolean;


  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService,
    private _sendMessageService: SendMessageService
  ) { }

  ngOnInit() {
    this.isunreadMessage();
    this.isWaitingDemands();
  }

  showSendMessageEvent() {
    this._sendMessageService
      .showMessagerie();
    this._sendMessageService
      .hideWaitingFriendsEvent();
  }


  showWaitingFriendsEvent() {
    this._sendMessageService
      .hideMessagerie();
    this._sendMessageService
      .showWaitingFriend();
  };

  onClickShowFeeds() {
    this._sendMessageService
      .hideMessagerie();
    this._sendMessageService
      .hideWaitingFriendsEvent();
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

  /**
   * Vérifie si des demandes d'amis sont en attente
   */
  isWaitingDemands(): void {
    const userId = this._authService.getOwnId();


    this.subIsWaitingDemands = this._authService
      .nbWaintingFriendDemand(userId)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
          this.nbWaitingDemands = -1;
        } else {
          this.nbWaitingDemands = data.nbWaiting;
          if (this.nbUnreadPosts > 0) {
            this.isWaitingDemand = true;
          } else {
            this.isWaitingDemand = false;
          }
        }
      });
  }

  onLogoutClick() {
    this._authService.logout();
    this._flashMessage.grayOut(true);
    this._flashMessage.show('Vous êtes maintenant déconnecté', {
      cssClass: 'alert-success text-center',
      timeout: 1500
    });
    this._router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.subGetUnreadMessages) {
      this.subGetUnreadMessages.unsubscribe();
      this.subGetUnreadMessages = null;
    }
    if (this.subIsWaitingDemands) {
      this.subIsWaitingDemands.unsubscribe();
      this.subIsWaitingDemands = null;
    }
  }
}

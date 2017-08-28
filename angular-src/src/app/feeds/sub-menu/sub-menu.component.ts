import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SendMessageService } from './../service/send-message.service';

@Component({
  selector: 'rts-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit, OnDestroy {

  subSendMessageService: any;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService,
    private _sendMessageService: SendMessageService
  ) { }

  ngOnInit() {
  }

  showSendMessageEvent() {
    this._sendMessageService.showMessagerie();
  }

  onClickShowFeeds() {
    this._sendMessageService.hideMessagerie();
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

  }
}

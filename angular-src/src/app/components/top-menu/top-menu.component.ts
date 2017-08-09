import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { User } from '../../core/user';

import { FlashMessagesService } from 'angular2-flash-messages';


import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guard/auth.guard';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'rts-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, OnDestroy {

  collapseSubMen: Boolean;
  logo = 'assets/images/earth_globe.png';
  isCollapse = true;
  isCollapseSubmenu = false;
  imageFace: String = '';
  public user: User;
  authService: AuthService;
  isLogged = false;

  sub: any;

  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) {

    this.collapseSubMen = this._authService.collapseSubMen;
  }

  ngOnInit() {
    this.isCollapseSubmenu = true;

    const userProfile = localStorage.getItem('user');

    if (userProfile && userProfile !== 'undefined') {
      this.user = JSON.parse(userProfile);

      this.imageFace = this.user.avatar || '/assets/images/Anonymous.png';
    }
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

  onCollapseSubmenu() {
    this.isCollapseSubmenu = !this.isCollapseSubmenu;
  }

  ngAfterContentChecked() {
    const userProfile = localStorage.getItem('user');

    if (userProfile && userProfile !== 'undefined') {
      this.user = JSON.parse(userProfile);

      this.imageFace = this.user.avatar || '/assets/images/Anonymous.png';
    }

  }

  ngOnDestroy() {
  }
}

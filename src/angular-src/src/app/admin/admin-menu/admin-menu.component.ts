import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'rts-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  logo = 'assets/images/earth_globe.png';

  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService,

  ) { }

  ngOnInit() {
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

}

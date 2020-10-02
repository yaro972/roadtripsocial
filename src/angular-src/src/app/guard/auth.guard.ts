import {AuthService} from '../services/auth/auth.service';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canActivate() {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}

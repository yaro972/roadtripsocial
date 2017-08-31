import { Component, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

import { Users } from './users'


@Component({
  selector: 'rts-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit, AfterContentChecked, OnDestroy {
  isConnected: Boolean;



  users: Users = {
    registered: 15,
    online: 7
  }

  journey: Number = 157;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    if (this._authService.loggedIn()) {
      this._router.navigate(['/feeds']);
      this.isConnected = true;
    }
  }

  ngOnInit() {
    // Si des elements sont présents mais erronés
    // => Vidage du localStorage

    if (localStorage.getItem('token') && localStorage.getItem('token') === '') {
      localStorage.clear();
    }

    if (localStorage.getItem('user') && localStorage.getItem('user') === '') {
      localStorage.clear();
    }



    if (this._authService.loggedIn()) {
      this._router.navigate(['/feeds']);

      this.isConnected = true;
    }
  }


  ngAfterContentChecked() {

    if (this._authService.loggedIn()) {
      this._router.navigate(['/feeds']);
      this.isConnected = true;
    }
  }

  ngOnDestroy() { }

}

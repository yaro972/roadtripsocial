import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'rts-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit, AfterContentChecked, OnDestroy {
  isConnected: Boolean;
  subGetNbUseregistred: Subscription;
  subGetNbTravelsegistred: Subscription;
  subNbOnlineUsers: Subscription;


  usersOnline: Number

  registredUsers: Number;
  nbRegistredTravels: Number;



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

    this.getNbUseregistred();
    this.getNbTravelsegistred();
    this.getNbusersOnlineUsers();
  }


  /**
   * Récupération du nombre d'utilisateurs
   */
  getNbUseregistred() {
    this.subGetNbUseregistred = this._authService
      .getNbUseregistred()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.registredUsers = data.nbRegistredUsers;
        }
      });
  };


  /**
 * Récupération du nombre de voyages déclarés
 */
  getNbTravelsegistred() {
    this.subGetNbTravelsegistred = this._authService
      .getNbTravelsegistred()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.nbRegistredTravels = data.nbRegistredTravels.length;
        }
      });
  };



  getNbusersOnlineUsers() {
    this.subNbOnlineUsers = this._authService
      .getNbOnlineUsers()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.usersOnline = data.nbConnected;
        }
      });
  }
  ngAfterContentChecked() {

    if (this._authService.loggedIn()) {
      this._router.navigate(['/feeds']);
      this.isConnected = true;
    }
  }

  ngOnDestroy() {
    if (this.subGetNbUseregistred) {
      this.subGetNbUseregistred.unsubscribe();
      this.subGetNbUseregistred = null;
    }

    if (this.subGetNbTravelsegistred) {
      this.subGetNbTravelsegistred.unsubscribe();
      this.subGetNbTravelsegistred = null;
    }
    if (this.subNbOnlineUsers) {
      this.subNbOnlineUsers.unsubscribe();
      this.subNbOnlineUsers = null;
    }
  }
}

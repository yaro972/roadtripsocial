import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';
import { environment } from './../../../environments/environment';

import { User } from '../../core/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  authToken: any;
  user: User;


  collapseSubMen = false;
  public userChangeSubject = new Subject<User>();
  public collapseSubmenuEv = new Subject<Boolean>();


  constructor(private _http: Http) { }

  registerUser(user) {
    const headers = new Headers();
    headers
      .append('Content-type', 'application/json');
    return this._http
      .put(environment.BACKENDURL + '/api/user/register', user, { headers: headers })
      .map(res => res.json());
  }

  registerCivilityUser(nickname, civility) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/register-civility',
      {
        nickname: nickname,
        civility: civility
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }

  registerExtraDetails(nickname, details) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/register-extra-details',
      {
        nickname: nickname,
        extraDetails: details
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }

  loginUser(user) {
    const headers = new Headers();
    headers
      .append('Content-type', 'application/json');

    return this._http
      .post(environment.BACKENDURL + '/api/user/login', user, { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this._http
      .get(environment.BACKENDURL + '/api/user/profile', { headers: headers })
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired();
  }

  isLogged() {
    const isLoggedObserv = new Observable(observable => {
      if (localStorage.getItem('token')) {
        console.log(true)
        observable.next(true);
      } else {
        console.log(false)
        observable.next(false);
      }
    });

    return isLoggedObserv;
  }

  /**
   * Permet de chercher un utilisateur à partir de son adresse email
   * @param mail Adresse email de l'utilisateur
   */
  findUserbyEmail(mail) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/find-user-by-mail', mail, { headers: headers })
      .map(res => res.json());
  }

  /**
   * Transfert l'évennement de modification de la fiche utilisateur
   * @param u :Utilisateur
   */
  changeUserEvent(u: User) {
    this.userChangeSubject.next(u)
  }

  /**
   * Permet de fermer le sous-menu
   * @param e Status de l'ouverture du menu
   */
  closeSubMenu(e: Boolean) {
    this.collapseSubmenuEv.next(e)
  }

  /**
  * Vérifie que le pseudonyme est disponible
  */
  isPseudoAvailable(nickname) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/nickname-availability', {
        'nickname': nickname
      }, {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
   * Mise à jour du profil de l'utilisateur
   */
  updateProfile(newUserProfile) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/update-profile',
      newUserProfile, {
        headers: headers
      })
      .map(res =>
        res.json()
      );
  };

  /**
   * Mot de passe perdu
    */
  lostPassword(userMail) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/lost-password', userMail, {
        headers: headers
      })
      .map(res => res.json());
  };

  /**
  * Modification du mot de passe de l'utilisateur
  */
  passwordChange(oldPass, newPass) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/change-password', {
        nickname: JSON.parse(localStorage.getItem('user')).nickname,
        oldPass: oldPass,
        newPass: newPass
      }, {
        headers: headers
      })
      .map(res => res.json());

  }

  /**
   * Reset du mot de passe de l'utilisateur
   */
  resetPassword(token, newPass) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/reset-password', {
        token: token,
        newPass: newPass
      }, {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
 * Fonction de recherche d'un membre sur l'ensemble de sa fiche
 * @param itemToFind Element à rechercher
 */
  searchMembers(itemToFind) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/search-member', {
        itemToFind: itemToFind
      }, {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
  * Fonction de recherche d'un membre basé sur son pseudo
  * @param itemToFind Element à rechercher
  */
  searchMemberByNickname(nickname: String) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/search-member-by-nickname', {
        nickname: nickname
      }, {
        headers: headers
      })
      .map(res => res.json());
  }



  /**
   * Retourne le détail d'une fiche utilisateur
   * @param id Id du membre
   */
  memberdetails(id) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/member-details', {
        memberId: id
      }, {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
   * Envoi d'un message à un membre
   */
  sendMessage(msg) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/send-message', { msg: msg }, {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
   * Liste des messages non lus pour l'utilisateur donné
   * @param userId Id du membre
   */
  getUnreadMessages(userId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/get-nbunread-messages', {
        userId: userId
      }, {
        headers: headers
      })
      .map(res => res.json());
  }



}

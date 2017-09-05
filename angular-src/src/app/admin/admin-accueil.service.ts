import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { environment } from './../../environments/environment';


@Injectable()
export class AdminAccueilService {
  isUsermanagement: Boolean;
  isMessageManagement: Boolean;
  isStattistics: Boolean;

  isManagementPanel: Boolean;

  authToken: any;

  constructor(
    private _http: Http
  ) { }

  setManagementPanel() {
    this.isManagementPanel = true;
  }
  unsetManagementPanel() {
    this.isManagementPanel = true;
  }
  getManagementPanelStatus() {
    return this.isManagementPanel;
  }

  setUserManagement() {
    this.isUsermanagement = true;
    this.isStattistics = false;
    this.isMessageManagement = false;
  }
  setMessagesManagement() {
    this.isUsermanagement = false;
    this.isStattistics = false;
    this.isMessageManagement = true;
  }
  setStatistics() {
    this.isUsermanagement = false;
    this.isStattistics = true;
    this.isMessageManagement = false;
  }

  getUserManagement() {
    return this.isUsermanagement;
  }
  getMessagesManagement() {
    return this.isMessageManagement;
  }
  getStatistics() {
    return this.isStattistics;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  getOwnId() {
    return JSON.parse(localStorage.getItem('user'))._id;
  }

  logout() {
    this.authToken = null;
    localStorage.clear();
  }

  /**
   * Récupère la liste des utilisateurs
   */
  getAllUsers() {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .get(environment.BACKENDURL + '/api/user/all-users',
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
   * Bloque un utilisateur
   * @param userId Id de l'utilisateur
   */
  lockUser(userId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/lock-user', {
        userId: userId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
   * Débloque un utilisateur
   * @param userId Id de l'utilisateur
   */
  unlockUser(userId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/unlock-user', {
        userId: userId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }
  /**
   * Applique les droits d'administrateur
   * @param userId Id de l'utilisateur
   */
  passToAdmin(userId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/pass-to-admin', {
        userId: userId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }


  /**
   * Supprime les droits d'administrateur
   * @param userId Id de l'utilisateur
   */
  setToMember(userId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/api/user/set-to-member', {
        userId: userId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }

}

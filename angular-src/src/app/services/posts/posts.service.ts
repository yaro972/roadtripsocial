import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class PostsService {
  BACKENDURL = 'http://localhost:3000';
  authToken: any;

  constructor(
    private _http: Http,
    private _auth: AuthService
  ) { }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  /**
   * Permet D'enregistrer un nouveau post
   * @param newPost Nouveau post
   */
  sendNewPost(newPost) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(this.BACKENDURL + '/api/new-post', newPost, { headers: headers })
      .map(res => res.json());
  }

  /**
   * Récupère le dernier message d'un utilisateur
   * @param nickname Pseudo de l'utilisateur
   */
  getLastPost(nickname) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(this.BACKENDURL + '/api/get-last-post', {
        nickname: nickname
      }, { headers: headers })
      .map(res => res.json());
  }

}

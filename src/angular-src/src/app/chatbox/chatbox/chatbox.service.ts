import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ChatboxService {
  constructor(private _http: Http) {
  }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      this._http
        .get(environment.BACKENDURL + '/chat/' + room)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
      this._http
        .post(environment.BACKENDURL + '/chat', data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}

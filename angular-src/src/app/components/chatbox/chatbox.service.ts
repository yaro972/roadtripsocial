import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import * as io from 'socket.io-client';

@Injectable()
export class ChatboxService {
  private url = environment.SOCKETURL;
  private socket;

  constructor() { }

  sendMsg(msg) {
    this.socket.emit('message', msg);
  }

  newUserConnected(user) {
    this.socket.emit('newUser', user);
  }

disconnect(){}

  getMsg() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        console.log(data)

        observer.next(data)
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}

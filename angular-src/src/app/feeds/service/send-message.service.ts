import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SendMessageService {
  isActive: Boolean;
  receiverId: String;

  constructor() {
    this.isActive = false;
  }

  showMessagerie() {
    this.isActive = true;
  }

  setReceiver(id) {
    this.receiverId = id;
  }
  unsetReceiver() {
    this.receiverId = null;
  }

  getReceiver() {
    return this.receiverId;
  }

  hideMessagerie() {
    this.isActive = false;
  }

  isShown() {
    const observable = new Observable(observer => {
      observer.next(this.isActive);
    });

    return observable;
  }



}

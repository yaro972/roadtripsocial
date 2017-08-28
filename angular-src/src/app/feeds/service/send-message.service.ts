import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SendMessageService {
  isActive: Boolean;

  constructor() {
    this.isActive = false;
  }

  showMessagerie() {

    this.isActive = true;
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

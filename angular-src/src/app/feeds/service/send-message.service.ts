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
    // const observable = new Observable(observer => {
    this.isActive = true;
    // observer.next(this.isActive);
    // });

    // return observable;
    console.log(1)
    return this.isActive;
  }

  hideMessagerie() {
    const observable = new Observable(observer => {
      this.isActive = false;
      observer.next(this.isActive);
    });

    return observable;
  }

  isShown() {
    const observable = new Observable(observer => {
      observer.next(this.isActive);
    });

    return observable;
  }

}

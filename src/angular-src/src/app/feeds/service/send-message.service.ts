import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SendMessageService {
  isActive: Boolean;
  receiverId: String;

  showWaitingFriendStatus: Boolean;

  constructor() {
    this.isActive = false;
    this.showWaitingFriendStatus = false;
  }

  /**
   * Affiche la messagerie
   */
  showMessagerie() {
    this.isActive = true;
  }

  /**
   * Affiche la liste des demandes en attente
   */
  showWaitingFriend() {
    this.showWaitingFriendStatus = true;
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

  hideWaitingFriendsEvent() {
    this.showWaitingFriendStatus = false;
  }

  isShown() {
    const observable = new Observable(observer => {
      observer.next(this.isActive);
    });


    return observable;
  }

  isWaitingFriendsShown() {
    const observable = new Observable(observer => {
      observer.next(this.showWaitingFriendStatus);
    });
    return observable;
  }
}

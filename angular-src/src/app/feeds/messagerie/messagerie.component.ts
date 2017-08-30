import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { User } from './../../core/user';
import { AuthService } from './../../services/auth/auth.service';
import { ShowImagePipe } from './../../show-images/pipes/show-image.pipe';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'rts-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit, OnDestroy {
  friendName: String;

  selectedContact: any;
  resetForm: Boolean;

  // Formulaire
  newMessageForm: FormGroup = new FormGroup({
    newMessage: new FormControl()
  });
  // Formulaire

  // Saiuvegarde de la souscripton en cours
  subGetMessengerContactList: Subscription;
  subSendMessage: Subscription;
  // Saiuvegarde de la souscripton en cours

  contactMessengerList = [];

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _flashMessage: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.onContactMessengerList();
  }

  onSendMessage() { }

  onSubmitClick() {
    const newMessage = {
      sender: this._auth.getOwnId(),
      receiver: this.selectedContact,
      content: this.newMessageForm.controls.newMessage.value,
      parentId: null
    }


    this.subSendMessage = this._auth.sendMessage(newMessage)
      .subscribe(data => {
        if (data.err) {
          this._flashMessage.show('Problème lors de l\'envoi du message', {
            cssClass: 'alert alert-danger text-center',
            timeout: 2500
          });
        } else {
          this._flashMessage.show('Le message a bien été envoyé', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });
          this._router.navigate(['/feeds']);
        }
      });
  }

  onContactMessengerList() {
    this.subGetMessengerContactList = this._auth.getMessengerContactList().subscribe((data) => {

      console.log(data)
      if (data.err) {
        console.log(data.err);
      } else {
        console.log(data.contactList)
        this.contactMessengerList = this.prepareData(data.contactList);

      }
    });
  }

  prepareData(list: Array<any>): Array<any> {
    const tmp: Array<any> = [];
    let saveDate: Date;

    for (let i = 0; i < list.length; i++) {

      if (list[i].lastPostDate) {
        saveDate = list[i].lastPostDate;
      }

      if (list[i].userA && list[i].userA._id !== this._auth.getOwnId()) {
        list[i].userA.lastPostDate = saveDate;
        tmp.push(list[i].userA);
      }

      if (list[i].userB && list[i].userB._id !== this._auth.getOwnId()) {
        list[i].userB.lastPostDate = saveDate;
        tmp.push(list[i].userB);
      }
    }

    console.log(tmp)

    return tmp;
  }

  onClickContactMessager(contactIndex) {
    console.log(contactIndex)
    this.selectedContact = this.contactMessengerList[contactIndex];
    this.resetForm = true;
  }

  onNewContact(event) {
    console.log(event)
    this.selectedContact = event;
  }

  ngOnDestroy() {
    if (this.subGetMessengerContactList) {
      this.subGetMessengerContactList.unsubscribe();
      this.subGetMessengerContactList = null;
    }

    if (this.subSendMessage) {
      this.subSendMessage.unsubscribe();
      this.subSendMessage = null;
    }
  }
}

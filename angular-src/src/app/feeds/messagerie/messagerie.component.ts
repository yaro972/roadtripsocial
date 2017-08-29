import { Component, OnInit, EventEmitter } from '@angular/core';
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
export class MessagerieComponent implements OnInit {
  friendName: String;

  selectedContact: any;
  resetForm: Boolean;

  // Formulaire
  newMessageForm: FormGroup = new FormGroup({
    newMessage: new FormControl()
  });
  // Formulaire

  // Fake
  contactMessengerList = [
    {
      _id: '000',
      nickname: 'M. X. 01',
      lastPostDate: '28 aout',
      avatar: 'http://via.placeholder.com/250x250',
      country: 'France'
    },
    {
      _id: '001',
      nickname: 'M. X. 02',
      lastPostDate: '27 aout',
      avatar: 'http://via.placeholder.com/250x250',
      country: 'Italy'
    },
    {
      _id: '002',
      nickname: 'M. X. 03',
      lastPostDate: '26 aout',
      avatar: 'http://via.placeholder.com/250x250',
      country: 'Vietnam'
    },
    {
      _id: '003',
      nickname: 'M. X. 04',
      lastPostDate: '25 aout',
      avatar: 'http://via.placeholder.com/250x250',
      country: 'England'
    },
    {
      _id: '004',
      nickname: 'M. X. 05',
      lastPostDate: '24 aout',
      avatar: 'http://via.placeholder.com/250x250',
      country: 'Spain'
    },
    {
      _id: '005',
      nickname: 'M. X. 06',
      lastPostDate: '23 aout',
      avatar: 'http://via.placeholder.com/250x250',
      country: 'Belgium'
    },
  ]

  // Fake



  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _flashMessage: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onSendMessage() { }
  onSubmitClick() {
    const newMessage = {
      senders: this.selectedContact,
      content: this.newMessageForm.controls.newMessage.value
    }
    console.log(newMessage);
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
}

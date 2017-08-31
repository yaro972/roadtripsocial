import { Component, OnInit, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { User } from './../../core/user';
import { AuthService } from './../../services/auth/auth.service';
import { ShowImagePipe } from './../../show-images/pipes/show-image.pipe';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SendMessageService } from './../service/send-message.service'

@Component({
  selector: 'rts-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit, OnDestroy, AfterContentInit {
  friendName: String;
  selectedContact: any;
  threadList: Array<any>;
  resetForm: Boolean;

  selectedUser: any;
  ownId: String;
  // Formulaire
  newMessageForm: FormGroup = new FormGroup({
    newMessage: new FormControl()
  });
  // Formulaire

  // Sauvegarde de la souscripton en cours
  subGetMessengerContactList: Subscription;
  subSendMessage: Subscription;
  subGetMessageFlow: Subscription;
  subSetReadStatus: Subscription;
  subRemoveReadStatus: Subscription;
  // Sauvegarde de la souscripton en cours

  contactMessengerList = [];
  messageFlow: Array<any>;
  threadId: String;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _flashMessage: FlashMessagesService,
    private _router: Router,
    private _SendMessageService: SendMessageService
  ) { }

  ngOnInit() {
    this.ownId = this._auth.getOwnId();
    this.onContactMessengerList();

    if (this._SendMessageService.getReceiver()) {
      this.selectedContact = this._SendMessageService.getReceiver();
      this.selectedUser = this.selectedContact;
    }
  }

  /**
   * En cas de soumission du message
   */
  onSubmitClick() {
    const newMessage = {
      sender: this._auth.getOwnId(),
      receiver: this.selectedContact,
      content: this.newMessageForm.controls.newMessage.value,
      parentId: null
    }


    this.subSendMessage = this._auth.sendMessage(newMessage)
      .subscribe(data => {
        if (data.err.err) {
          this._flashMessage.show('Problème lors de l\'envoi du message', {
            cssClass: 'alert alert-danger text-center',
            timeout: 2500
          });
        } else {
          this.onShowMessages(this.threadId);
          this.newMessageForm.controls.newMessage.reset();
          this._flashMessage.show('Le message a bien été envoyé', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });

          this.subRemoveReadStatus = this._auth.removeReadStatus(this.threadId, this.selectedContact._id).subscribe(ev => {
            if (ev.err) {
              console.log(ev.err);
            }
          });
          // this._router.navigate(['/feeds']);
        }
      });
  }

  /**
   * Récupére la liste des utilisateurs enegistrés
   */
  onContactMessengerList() {
    this.subGetMessengerContactList = this._auth.getMessengerContactList().subscribe((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.threadList = data.contactList; // Sauvegarde de la liste des flux
        this.contactMessengerList = this.prepareData(data.contactList);
      }
    });
  }

  /**
   * Mise en forme des données récupérées
   * @param list Liste des utilisateurs récupérés
   */
  prepareData(list: Array<any>): Array<any> {
    const tmp: Array<any> = [];
    let saveDate: Date;
    let hasUnread: Boolean;

    for (let i = 0; i < list.length; i++) {

      // Sauvegarde de la date du dernier post
      if (list[i].lastPostDate) {
        saveDate = list[i].lastPostDate;
      }

      // Sauvegarde du status de lecture du flux
      if (list[i].read.indexOf(this.ownId) !== -1) {
        hasUnread = false;
      } else {
        hasUnread = true;
      }

      if (list[i].userA && list[i].userA._id !== this._auth.getOwnId()) {
        list[i].userA.lastPostDate = saveDate;
        list[i].userA.hasUnread = hasUnread;
        tmp.push(list[i].userA);
      }

      if (list[i].userB && list[i].userB._id !== this._auth.getOwnId()) {
        list[i].userB.lastPostDate = saveDate;
        list[i].userB.hasUnread = hasUnread;
        tmp.push(list[i].userB);
      }
    }
    return tmp;
  }

  /**
   * Récupère le détail de l'utilisateur sélectionné
   * @param contactIndex Index de l'utilisateur sélectionné
   */
  onClickContactMessager(contactIndex) {
    console.log(contactIndex)
    this.selectedContact = this.contactMessengerList[contactIndex];
    this.resetForm = true;

    this.threadId = this.threadList[contactIndex]._id;
    this.onShowMessages(this.threadId);


    this.subSetReadStatus = this._auth.setReadStatus(this.threadId, this.ownId)
      .subscribe(ev => {
        if (ev.err) {
          console.log(ev.err);
        }
      });

  }


  /**
   * Affiche les messages
   * @param threadId Affichage de la liste des messages d'un contact
   */
  onShowMessages(threadId: String) {
    this.subGetMessageFlow = this._auth.getMessageFlow(threadId)
      .subscribe((data) => {
        if (data.err) {
          console.log(data.err)
        } else {
          this.messageFlow = data.messageList;
        }
      });
  }

  /**
   * Récupère l'identifiant de l'utilisateur sélectionné
   * @param event Evenement issu du click
   */
  onNewContact(event) {
    this.selectedContact = event;
  }

  /**
   * Mise à jour du contenu de l'ensemble de la page
   */
  ngAfterContentInit() {
    if (this.threadId) {
      this.onShowMessages(this.threadId);
    }
  }

  /**
   * Destruction de la vue
   */
  ngOnDestroy() {
    if (this.subGetMessengerContactList) {
      this.subGetMessengerContactList.unsubscribe();
      this.subGetMessengerContactList = null;
    }

    if (this.subSendMessage) {
      this.subSendMessage.unsubscribe();
      this.subSendMessage = null;
    }

    if (this.subGetMessageFlow) {
      this.subGetMessageFlow.unsubscribe();
      this.subGetMessageFlow = null;
    }

    if (this.subSetReadStatus) {
      this.subSetReadStatus.unsubscribe();
      this.subSetReadStatus = null;
    }
    if (this.subRemoveReadStatus) {
      this.subRemoveReadStatus.unsubscribe();
      this.subRemoveReadStatus = null;
    }
  }
}

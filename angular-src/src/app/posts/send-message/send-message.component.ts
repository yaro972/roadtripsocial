import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/Forms';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { User } from './../../core/user';
import { AuthService } from './../../services/auth/auth.service';
import { ShowImagePipe } from './../../show-images/pipes/show-image.pipe';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'rts-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit, OnDestroy {
  // Definition des éléments du formulaire
  sendMailForm: FormGroup;
  toInput = new FormControl('', Validators.required);

  messageInput = new FormControl('', Validators.required);


  nickname: String;
  memberList: User[];
  selectedMember: User;
  onShowMemberList: Boolean;

  // Sauvegarde des souscriptions
  subSearchMembers: Subscription;
  subSendMessage: Subscription;
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.sendMailForm = this._fb
      .group({
        'toInput': this.toInput,
        'messageInput': this.messageInput
      });

    this.nickname = '';
    this.onShowMemberList = false;

    // Surveille tout changement sur le champs Input du formulaire
    this.sendMailForm.valueChanges
      .subscribe(() => {

        if (this.sendMailForm.get('toInput').value !== this.nickname) {
          this.onToInputChange();
        }
      });

  }

  onToInputChange() {
    if (this.sendMailForm.get('toInput').value.length) {
      this.subSearchMembers = this._auth
        .searchMemberByNickname(this.sendMailForm
          .get('toInput').value)
        .subscribe(data => {
          if (data.err) {
            console.log(data.err)
          } else {
            this.memberList = data.membersList;
            this.onShowMemberList = true;
          }
        });
    }
  };

  onSelectReceiver(index) {
    this.selectedMember = this.memberList[index];
    this.nickname = this.selectedMember.nickname;
    this.toInput.reset(this.nickname);
    this.onShowMemberList = false;
  }
  onSendMessage() {
    let messageElement = {
      receiver: this.selectedMember,
      messageText: this.sendMailForm.get('messageInput').value,
      sender: JSON.parse(localStorage.getItem('user'))._id
    }

    this.subSendMessage = this._auth.sendMessage().subscribe(data => {
      if (data.err) {

      } else {

      }
    });


  };

  ngOnDestroy() {
    if (this.subSearchMembers) {
      this.subSearchMembers.unsubscribe();
      this.subSearchMembers = null;
    }

    if (this.subSendMessage) {
      this.subSendMessage.unsubscribe();
      this.subSendMessage = null;
    }
  }
}

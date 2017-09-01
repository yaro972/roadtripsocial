import { Component, OnInit, Input, Output, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { NgModel } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ProfileEditService } from './../../services/profile-edit/profile-edit.service';

import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { CitiesClass } from './../../services/profile-edit/list-cities';
import { User } from '../../core/user';
import { ShowImagePipe } from './../../show-images/pipes/show-image.pipe';
import { SendMessageService } from './../../feeds/service/send-message.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rts-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Input() suivi: Boolean;
  @Input() isOwnProfile: Boolean;

  @ViewChild('fileInput') fileInput;

  sub: any;

  title: String; // Titre de la page

  pinImg: String = '/assets/images/pin1.png';

  newVisitedCountry: String;
  visitedCountryList: CitiesClass[];

  age: Number;
  subAddFollow: Subscription;

  constructor(
    private _authService: AuthService,
    private _flashMessage: FlashMessagesService,
    private _uploadService: FileUploadService,
    private _profileService: ProfileEditService,
    private _sendMessageService: SendMessageService,
    private _router: Router
  ) {
    this._authService.collapseSubMen = true;
  }

  ngOnInit() {
    this.age = this._profileService
      .calcAge(this.user.birthdate);
  }

  onFollow() {
    this.suivi = !this.suivi;

    this.subAddFollow = this._authService
      .addFollow(this._authService.getOwnId(), this.user._id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this._flashMessage.show('Une demande d\'ami a été envoyée ', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });
        }
      });
    return false;
  }
  unFollow() {
    this.suivi = !this.suivi;
  }


  onSendPrivateMessage(u) {
    this._sendMessageService.showMessagerie();
    this._sendMessageService.setReceiver(u._id);
    this._router.navigate(['/feeds']);

  }

  ngOnDestroy() {
    if (this.subAddFollow) {
      this.subAddFollow.unsubscribe();
      this.subAddFollow = null;
    }
  };
}

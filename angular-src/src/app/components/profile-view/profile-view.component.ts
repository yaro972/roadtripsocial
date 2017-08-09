import { Component, OnInit, Input, Output, AfterViewChecked, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { NgModel } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ProfileEditService } from './profile-edit/profile-edit.service';

import { FileUploadService } from '../../services/file-upload.service';
import { CitiesClass } from './profile-edit/list-cities';
import { User } from '../../core/user';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rts-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() user: User;
  @Input() suivi: Boolean;
  @Input() isOwnProfile: Boolean;
  @Input() lastPostMessage: String;

  @ViewChild("fileInput") fileInput;

  sub: any;

  title: String; // Titre de la page

  pinImg: String = '/assets/images/pin1.png';

  newVisitedCountry: String;
  visitedCountryList: CitiesClass[];

  age: Number;
  ageSubsciption: Subscription;

  constructor(
    private _authService: AuthService,
    private _flashMessage: FlashMessagesService,
    private _uploadService: FileUploadService,
    private _profileService: ProfileEditService
  ) {
    this._authService.collapseSubMen = true;
  }

  ngOnInit() {


    console.log(this.user.gender);
    // this.genderIco = 'fa fa-mars';
    // if (this.user.gender === 1) {
    //   this.genderIco = 'fa fa-venus';
    // }
    this.age = this._profileService.calcAge(this.user.birthdate);
  }

  onFollow() {
    this.suivi = !this.suivi;
  }
  ngAfterViewChecked() {
  }

  ngOnDestroy() {

  };
}

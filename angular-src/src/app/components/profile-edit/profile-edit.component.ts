import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { NgModel } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ProfileEditService } from './../../services/profile-edit/profile-edit.service';

import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { CitiesClass } from './../../services/profile-edit/list-cities';


import { Subscription } from 'rxjs/Subscription';

import { ShowImagePipe } from './../../pipes/show-image.pipe';

import { User } from '../../core/user';

@Component({
  selector: 'rts-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() user: User;
  @Input() suivi: Boolean;
  @Input() isOwnProfile: Boolean;
  @Input() onSave: Boolean;

  @Output() newUser: EventEmitter<User> = new EventEmitter();

  [x: string]: any;
  @ViewChild("fileInput") fileInput;

  sub: any;

  isOnModif: Boolean; // Page en cours de modification

  title: String; // Titre de la page

  pinImg: String = '/assets/images/pin1.png';

  newVisitedCountry: String;
  visitedCountryList: CitiesClass[];

  age: Number;
  ageSubsciption: Subscription;
  genderIco: String;

  moisNaissance: String;
  jourNaissance: String;
  anneeNaissance: String;
  isAddFile: Boolean;
  photoProfUpload: String;

  constructor(
    private _authService: AuthService,
    private _flashMessage: FlashMessagesService,
    private _uploadService: FileUploadService,
    private _profileService: ProfileEditService
  ) {
    this._authService.collapseSubMen = true;
  }

  ngOnInit() {
    this.isOnModif = false;
    this.isAddFile = false;

    this.genderIco = 'fa fa-mars';
    if (this.user.gender === 1) {
      this.genderIco = 'fa fa-venus';
    }


    // this.calculateAge();
    this.extractDateMonthYear();


    this._profileService.initListCountries(this.user.visitedCountries);

    this.visitedCountryList = this._profileService.getallCities();
    this.photoProfUpload = this.user.avatar;

    this._profileService.getSaveStatus().subscribe((saveStatus) => {
      if (saveStatus === true) {
        this.save();
      }
    });
  }

  onFollow() {
    this.suivi = !this.suivi;
  }

  modify() {
    this.isOnModif = true;
  }

  reset() {
    this.isOnModif = false;
  }
  /**
   * Savegarde des éléments modifiés de la page
   */
  save() {

    // Reconstitution de la date de naissance
    const birthdate = new Date(this.moisNaissance + '/' + this.jourNaissance + '/' + this.anneeNaissance);

    // Stockage de cette date dans l'objet this.registerForm.value, avant envoi au backend
    this.user.birthdate = birthdate;
    this.user.avatar = this.photoProfUpload;

    this.newUser.emit(this.user);
    this.sub = this._authService.updateProfile(this.user).subscribe(data => {
      if (data.err) {
        this._flashMessage.grayOut(true);
        this._flashMessage.show('Une Erreur est apparue lors de la mise à jour de votre profile', {
          cssClass: 'alert alert-danger text-center',
          timeout: 2500
        });
      } else {
        const uTmp = JSON.parse(localStorage.getItem('user'));
        uTmp.birthdate = this.user.birthdate;
        localStorage.setItem('user', JSON.stringify(uTmp));

        this._flashMessage.grayOut(true);
        this._flashMessage.show('Votre profile a bien été mis à jour', {
          cssClass: 'alert alert-success text-center',
          timeout: 2500
        });

        this.newUser.emit(this.user);
      }
    });
  }

  addCountry() {
    this._profileService.addVisitedCountry(this.newVisitedCountry);
    this.visitedCountryList = this._profileService.getallCities();
    return false;
  };

  removeCountry(country) {
    this._profileService.removeVisitedCountry(country);
    this.visitedCountryList = this._profileService.getallCities();
    this.newVisitedCountry = '';
    return false;
  };

  calculateAge() {
    if (this.isOwnProfile) {
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    }

    this.age = this._profileService.calcAge(this.user.birthdate);
  }

  extractDateMonthYear() {
    const birthD = new Date(this.user.birthdate);

    this.jourNaissance = '' + birthD.getDate();
    this.moisNaissance = '' + birthD.getMonth();
    this.anneeNaissance = '' + birthD.getFullYear();
  };

  addFileEvent(input) {
    if (input.files.length) {
      this.isAddFile = true;
    } else {
      this.isAddFile = false;
    }
  };

  addFile(): Boolean {
    let fi = this.fileInput.nativeElement;

    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.sub = this._uploadService
        .upload(fileToUpload)
        .subscribe(res => {
          console.log(res);
          let response = res.json().filename;


          this.photoProfUpload = res.json().filename;
        });
    }

    return false;
  }

  ngAfterViewChecked() {
  }


  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.ageSubsciption) {
      this.ageSubsciption.unsubscribe();
    }
  };

}

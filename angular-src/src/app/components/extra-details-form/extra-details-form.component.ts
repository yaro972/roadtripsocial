import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { FormControl, FormGroup, Validators, FormBuilder, NgModel } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { ShowImagePipe } from './../../pipes/show-image.pipe';



@Component({
  selector: 'rts-extra-details-form',
  templateUrl: './extra-details-form.component.html',
  styleUrls: ['./extra-details-form.component.css']
})
export class ExtraDetailsFormComponent implements OnInit, OnDestroy {
  @Input() nickname: String;

  @ViewChild("fileInput") fileInput;

  countriesList: String[];
  registerForm: FormGroup;
  visitedCountryValue = ''

  visitedCountry = new FormControl('');
  presentation = new FormControl('');
  photoProfile = new FormControl('');

  active: Boolean = true;
  isAddFile: Boolean;
  photoProfUpload: String;

  sub: any;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService,
    private _uploadService: FileUploadService
  ) {

  }

  ngOnInit() {
    this.registerForm = this._fb.group({
      'visitedCountry': this.visitedCountry,
      'presentation': this.presentation,
      'photoProfile': this.photoProfile
    });

    this.countriesList = [];
    this.isAddFile = false;
    this.photoProfUpload = '';
  }

  onRegisterSubmitPart() {
    // Register User

    if (this.countriesList.indexOf(this.registerForm.value.visitedCountry) === -1) {
      this.countriesList.push(this.registerForm.value.visitedCountry);
    }


    this.registerForm.value.avatar = this.photoProfUpload;


    this.registerForm.value.visitedCountries = this.countriesList;

    this.sub = this._authService.registerExtraDetails(this.nickname, this.registerForm.value)
      .subscribe(data => {
        if (data.err) {
          this._flashMessage.grayOut(true);
          this._flashMessage.show(data.msg, {
            cssClass: 'alert alert-danger text-center',
            timeout: 2500
          });

        } else {
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Vous êtes maintenant enregitré', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });
          this._router.navigate(['/login'])
        }
      })
  }

  addCountry() {
    this.countriesList.push(this.registerForm.value.visitedCountry);
    this.visitedCountryValue = "";
  }

  removeCountry(country) {
    let index: number = this.countriesList.indexOf(country);
    if (index !== -1) {
      this.countriesList.splice(index, 1);
    }
  }

  addFile(e): Boolean {
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
  addFileEvent(input) {
    if (input.files.length) {
      this.isAddFile = true;
    } else {
      this.isAddFile = false;
    }
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

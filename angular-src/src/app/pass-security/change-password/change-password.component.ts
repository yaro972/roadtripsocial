import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'rts-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  info: String;
  title = 'Modification de votre mot de passe';
  sub: any;

  PasswordChangeForm: FormGroup;
  lastPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16)
  ]);
  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16)
  ]);
  newPasswordConfirm = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16)
  ]);


  constructor(
    private _flashMessage: FlashMessagesService,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }


  ngOnInit() {
    this.PasswordChangeForm = this._fb.group({
      'lastPassword': this.lastPassword,
      'newPassword': this.newPassword,
      'newPasswordConfirm': this.newPasswordConfirm
    });
  }

  onPasswordChangeSubmit() {
    // Validation du changement du mot de passe
    this.sub = this._authService
      .passwordChange(this.PasswordChangeForm.value.lastPassword, this.PasswordChangeForm.value.newPassword)
      .subscribe(data => {

        if (data.succeed) {
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Le mot de passe a été modifié', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });

          this._router.navigate(['/profile']);

        } else {
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Le mot de passe n\'a pas été modifié', {
            cssClass: 'alert alert-danger text-center',
            timeout: 2500
          });
          this._router.navigate(['/']);
        }
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

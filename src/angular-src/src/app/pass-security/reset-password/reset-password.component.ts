import {Component, OnDestroy, OnInit} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';

// import { resetpasswd } from './resetPasswd';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'rts-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  info: String;
  title = 'Réinitialisation de votre mot de passe';
  mail: String;
  token: any; // Partie passée en argument
  sub: any;

  resetPasswordFrom: FormGroup;
  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16)
  ]);
  passwordConfirm = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16)
  ]);


  constructor(
    private _flashMessage: FlashMessagesService,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }


  ngOnInit() {
    // this.bankName = this.route.snapshot.params['bank'];

    this.resetPasswordFrom = this._fb.group({
      'newPassword': this.newPassword,
      'passwordConfirm': this.passwordConfirm
    });

    this.sub = this._route.params.subscribe(params => {
      this.token = params['token']; // (+) converts string 'id' to a number
    });
  };

  onResetFormSubmit() {
    // Validation du changement du mot de passe
    this.sub = this._authService.resetPassword(this.token, this.resetPasswordFrom.value.newPassword).subscribe(data => {

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
      this.sub = null;
    }
  }
}

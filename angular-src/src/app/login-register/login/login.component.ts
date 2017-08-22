import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'rts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  active: Boolean = true;
  info: String;
  title = 'Connectez-vous';
  lostPassword = false;
  sub: any;

  loginForm: FormGroup;
  nickname = new FormControl('', Validators.required);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16)
  ]);

  lostPasswordForm: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('[^ @]*@[^ @]*'),
    Validators.email
  ]);

  constructor(
    // private _validateLogin: ValidateLoginService,
    private _flashMessage: FlashMessagesService,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }


  ngOnInit() {
    this.loginForm = this._fb.group({
      'nickname': this.nickname,
      'password': this.password
    });

    this.lostPasswordForm = this._fb.group({
      'email': this.email
    });
  }

  onLoginSubmit() {
    // Register User
    this.sub = this._authService.loginUser(this.loginForm.value).subscribe(data => {
      if (data.succeed) {
        this._flashMessage.grayOut(true);
        this._flashMessage.show('Vous êtes connecté', {
          cssClass: 'alert alert-success text-center',
          timeout: 2500
        });

        this._authService.storeUserData(data.token, data.user);

        let u = localStorage.getItem('user');
        if (u) {
          let firstConn = JSON.parse(u).firstConn

          if (firstConn) {
            //Première connexion ou profil incomplet
            this._router.navigate(['/profile']);
          } else {
            // => Routage vers l'accueil des messages
            this._router.navigate(['/feeds']);
          }
        } else {
          // Erreur de chargement du profil
          this._router.navigate(['/profile']);
        }



      } else {
        this._flashMessage.grayOut(true);
        this._flashMessage.show('Nom ou mot de passe erroné', {
          cssClass: 'alert alert-danger text-center',
          timeout: 2500
        });
        this._router.navigate(['/login']);
      }
    });
  }

  onLostPass() {
    this.lostPassword = true;
    this.title = 'Mot de passe perdu';
  }

  onLostPasswordSubmit() {
    this.sub = this._authService.lostPassword(this.lostPasswordForm.value).subscribe(data => {
      if (data.succeed) {
        this._router.navigate(['/reset-password', data.token]);

      } else {
        this._flashMessage.grayOut(true);
        this._flashMessage.show('Veuillez vérifier votre address email', {
          cssClass: 'alert alert-danger text-center',
          timeout: 2500
        });
        this._router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

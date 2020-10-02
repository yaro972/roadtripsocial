import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
import {User} from '../../core/user'


@Component({
  selector: 'rts-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  // Evenenement provenant des vues filles
  @Output() register = new EventEmitter<boolean>();
  @Output() userNickname = new EventEmitter<boolean>();

  sub: any;
  subPseudo: any;
  user: User;

  // Création du formulaire
  registerForm: FormGroup;

  nickname = new FormControl('', Validators.required);
  pseudo = new FormControl('', Validators.required);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('[^ @]*@[^ @]*'),
    Validators.email
  ]);
  passedChk = new FormControl();

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16)
  ]);

  confirm = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16)
  ]);


  isNicknameAvailable: Boolean;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      'nickname': this.nickname,
      'email': this.email,
      'password': this.password,
      'confirm': this.confirm,
      'passedChk': this.passedChk
    });

    this.isNicknameAvailable = null;
  }

  /**
  * Envoi des données du formulaire
  */
  onRegisterSubmitPart(el) {
    // Register User
    this.sub = this._authService.registerUser(this.registerForm.value).subscribe(data => {
      if (data.err) {
        this._flashMessage.grayOut(true);
        this._flashMessage.show(data.msg, {
          cssClass: 'alert alert-danger text-center',
          timeout: 2500
        });
        console.log(data.err);
      } else {
        if (this.registerForm.value.passedChk) {
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Vous êtes maintenant enregitré', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });
          this.register.emit(false);

          this._router.navigate(['/login']);
        } else {
          this.register.emit(true);

        }
        // this.userNickname.emit(this.registerForm.value.nickname);
        this.userNickname = this.registerForm.value.nickname;
      }
    });
  }

  /**
  * Perte du focus du champs pseudonyme
  */
  onBlur() {
    if (this.registerForm.value.nickname === '') {
      this.isNicknameAvailable = null;
    } else {



      this.subPseudo = this._authService.isPseudoAvailable(this.registerForm.value.nickname)
        .subscribe(data => {

          if (data.succeed) {
            if (!data.available) {
              this._flashMessage.grayOut(true);
              this._flashMessage.show('Le pseudonyme choisi n\'est pas disponible', {
                cssClass: 'alert alert-danger text-center',
                timeout: 2500
              });
              this.isNicknameAvailable = false;

            } else {
              this._flashMessage.grayOut(true);
              this._flashMessage.show('Le pseudonyme est disponible', {
                cssClass: 'alert alert-success text-center',
                timeout: 2500
              });

              this.isNicknameAvailable = true;
            }
          } else {
            this._flashMessage.grayOut(true);
            this._flashMessage.show('Nous ne pouvons vérifier la disponibilité du pseudonyme', {
              cssClass: 'alert alert-danger text-center',
              timeout: 2500
            });
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
    if (this.subPseudo) {
      this.subPseudo.unsubscribe();
      this.subPseudo = null;
    }
  }
}

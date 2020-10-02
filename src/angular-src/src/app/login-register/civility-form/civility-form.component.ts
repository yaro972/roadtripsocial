import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
import {User} from '../../core/user';


@Component({
  selector: 'rts-civility-form',
  templateUrl: './civility-form.component.html',
  styleUrls: ['./civility-form.component.css']
})
export class CivilityFormComponent implements OnInit, OnDestroy {
  // Paramètres passé à l'appel du composant
  @Input() nickname: String;
  @Input() user: User;
  @Output() validateCivility = new EventEmitter<boolean>();

  sub: any;

  // Creation du formulaire
  registerForm: FormGroup;

  // Elements du formulaire
  firstname = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);
  gender = new FormControl('0', [
    Validators.required,
  ]);

  jourNaissance = new FormControl('--');
  moisNaissance = new FormControl('--');
  anneeNaissance = new FormControl('--');

  city = new FormControl('', [
    Validators.required,
  ]);

  country = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      'firstname': this.firstname,
      'lastname': this.lastname,
      'gender': this.gender,
      'city': this.city,
      'country': this.country,
      'jourNaissance': this.jourNaissance,
      'moisNaissance': this.moisNaissance,
      'anneeNaissance': this.anneeNaissance
    });
  }

  onRegisterSubmitPart(el) {
    // Reconstitution de la date de naissance
    const birthdate = new Date(this.registerForm.value.moisNaissance + '/' +
      this.registerForm.value.jourNaissance + '/' +
      this.registerForm.value.anneeNaissance);

    // Stockage de cette date dans l'objet this.registerForm.value, avant envoi au backend
    this.registerForm.value.birthdate = birthdate;
    // Register User
    this.sub = this._authService
      .registerCivilityUser(this.nickname, this.registerForm.value)
      .subscribe(data => {
        if (data.err) {
          this._flashMessage.grayOut(true);
          this._flashMessage.show(data.msg, {
            cssClass: 'alert alert-danger text-center',
            timeout: 2500
          });
          this.validateCivility.emit(true);
        } else {
          this.validateCivility.emit(false);
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

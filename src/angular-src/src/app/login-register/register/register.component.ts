import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'rts-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateCivility: Boolean;
  nickname: String;
  registerCivility: Boolean;
  register: Boolean;
  registerExtraDetails: Boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.register = true;
    this.registerCivility = false;
    // this.nickname = "";
    this.registerExtraDetails = false;
  }

  onValidateCivility(ev) {
    this.registerCivility = ev;
    this.registerExtraDetails = !ev;
  }

  onUserNickname(nickname) {
    this.nickname = nickname;
  }

  onRegister(ev) {
    this.registerCivility = true;
    this.register = false;
  }

  onValidateExtraDetails(ev) {
    this.registerCivility = false;
    this.register = false;
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../core/user';
import {ProfileEditService} from '../../services/profile-edit/profile-edit.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'rts-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  suivi: false;
  isOwnProfile: Boolean;
  onSavedEvent: Boolean;

  isOnModif: Boolean;
  subGetProfile: Subscription;
  subGetSaveStatus: Subscription;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _editService: ProfileEditService
  ) {
    this.getOwnData();
    this.isOwnProfile = true;
  }
  ngOnInit() {
    // this.isOnModif = false;
    this.onSavedEvent = false;
    this._editService.onSaveEvent(false);

    this._authService.closeSubMenu(false);

    this.getSaveStatus();
  }

  getOwnData() {
    this.subGetProfile = this._authService
      .memberdetails(this._authService.getOwnId())
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.user = data.memberDetails;
        }
      });
  }

  modify() {
    this.isOnModif = true;
  }

  reset() {
    this.isOnModif = false;
  }

  getSaveStatus() {
    this.subGetSaveStatus = this._editService
      .getSaveStatus()
      .subscribe(status => {
        this.onSavedEvent = status;
      });
  }

  save() {
    this.onSavedEvent = true;
    this._editService.onSaveEvent(true);

  }

  loadNewUser($event) {
    this.user = $event;
    this.isOnModif = false;

    // return true;
  }

  ngOnDestroy() {
    if (this.subGetProfile) {
      this.subGetProfile.unsubscribe();
      this.subGetProfile = null;
    }
    if (this.subGetSaveStatus) {
      this.subGetSaveStatus.unsubscribe();
      this.subGetSaveStatus = null;
    }
  }
}

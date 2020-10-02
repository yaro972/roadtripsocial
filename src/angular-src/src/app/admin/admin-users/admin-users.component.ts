import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {Subscription} from 'rxjs/Subscription';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'rts-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  userList = [];
  subGetUser: Subscription;
  subDeleteUser: Subscription;

  constructor(
    private _adminService: AdminService,
    private _flashMessage: FlashMessagesService,
  ) { }

  /**
   * Blocage d'un utilisateur
   * @param id
   */
  onLock(indice) {
    const selectedUser = this.userList[indice];

    this.subDeleteUser = this._adminService
      .lockUser(selectedUser._id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.userList[indice] = data.users;

          this.getallUsers();
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Utilisateur bloqué', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });
        }
      });
  }
  /**
   * Déblocage d'un utilisateur
   * @param id
   */
  onUnlock(indice) {
    const selectedUser = this.userList[indice];

    this.subDeleteUser = this._adminService
      .unlockUser(selectedUser._id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.userList[indice] = data.users;

          this.getallUsers();
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Utilisateur débloqué', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });
        }
      });
  }


  getallUsers() {
    this.subGetUser = this._adminService
      .getAllUsers()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.userList = data.users;
        }
      });
  }

  passToAdmin(indice) {
    const selectedUser = this.userList[indice];

    this.subDeleteUser = this._adminService
      .passToAdmin(selectedUser._id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.userList[indice] = data.users;

          this.getallUsers();
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Role administrateur ajouté', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });
        }
      });
  }


  setToMember(indice) {
    const selectedUser = this.userList[indice];

    this.subDeleteUser = this._adminService
      .setToMember(selectedUser._id)
      .subscribe(data => {

        if (data.err) {
          console.log(data.err);
        } else {
          if (data.notRevoked) {
            this._flashMessage.grayOut(true);
            this._flashMessage.show('Il doit rester au moins un administrateur', {
              cssClass: 'alert alert-danger text-center',
              timeout: 2500
            });
            this.getallUsers();
          } else {
            this.userList[indice] = data.users;

            this.getallUsers();
            this._flashMessage.grayOut(true);
            this._flashMessage.show('Rôle administrateur supprimé', {
              cssClass: 'alert alert-success text-center',
              timeout: 2500
            });
          }
        }
      });
  }
  ngOnInit() {
    this.getallUsers();
  }

  ngOnDestroy() {
    if (this.subGetUser) {
      this.subGetUser.unsubscribe();
      this.subGetUser = null;
    }
    if (this.subDeleteUser) {
      this.subDeleteUser.unsubscribe();
      this.subDeleteUser = null;
    }
  }
}

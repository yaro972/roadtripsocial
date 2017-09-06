import { Component, OnInit, OnDestroy } from '@angular/core';

import { AdminService } from './../admin.service';


@Component({
  selector: 'rts-admin-accueil',
  templateUrl: './admin-accueil.component.html',
  styleUrls: ['./admin-accueil.component.css']
})
export class AdminAccueilComponent implements OnInit, OnDestroy {
  isUsermanagement: Boolean;
  isMessageManagement: Boolean;
  isStatistics: Boolean;

  constructor(
    private _adminService: AdminService
  ) { }

  updateStates() {
    this.isUsermanagement = this._adminService.getUserManagement();
    this.isMessageManagement = this._adminService.getMessagesManagement();
    this.isStatistics = this._adminService.getStatistics();
  }

  manageUsers() {
    this._adminService.setUserManagement();
    this.updateStates();
  };

  manageMessages() {
    this._adminService.setMessagesManagement();
    this.updateStates();
  };
  showStatistics() {
    this._adminService.setStatistics()
    this.updateStates();
  };
  ngOnInit() {
    this._adminService.setManagementPanel();
  }

  ngOnDestroy() {
    this._adminService.unsetManagementPanel();
  }
}

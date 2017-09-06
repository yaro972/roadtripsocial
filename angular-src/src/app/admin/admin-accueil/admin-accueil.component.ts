import { Component, OnInit, OnDestroy } from '@angular/core';

import { AdminService } from './../admin.service';


@Component({
  selector: 'rts-admin-accueil',
  templateUrl: './admin-accueil.component.html',
  styleUrls: ['./admin-accueil.component.css']
})
export class AdminAccueilComponent implements OnInit, OnDestroy {

  constructor(
    private _adminService: AdminService
  ) { }

  manageUsers() {
    this._adminService.setUserManagement();
  };

  manageMessages() {
    this._adminService.setMessagesManagement();
  };
  showStatistics() {
    this._adminService.setStatistics()
  };
  ngOnInit() {
    this._adminService.setManagementPanel();
  }

  ngOnDestroy() {
    this._adminService.unsetManagementPanel();
  }
}

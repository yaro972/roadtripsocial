import { Component, OnInit, OnDestroy } from '@angular/core';

import { AdminAccueilService } from './../admin-accueil.service';


@Component({
  selector: 'rts-admin-accueil',
  templateUrl: './admin-accueil.component.html',
  styleUrls: ['./admin-accueil.component.css']
})
export class AdminAccueilComponent implements OnInit, OnDestroy {

  constructor(
    private _adminAccueilService: AdminAccueilService
  ) { }

  manageUsers() {
    this._adminAccueilService.setUserManagement();
    alert('Manage Users - Not implemented');
  };

  manageMessages() {
    this._adminAccueilService.setMessagesManagement();
    alert('Manage Messages - Not implemented');
  };
  showStatistics() {
    this._adminAccueilService.setStatistics()
    alert('Manage Statistics - Not implemented');
  };
  ngOnInit() {
    this._adminAccueilService.setManagementPanel();
  }

  ngOnDestroy() {
    this._adminAccueilService.unsetManagementPanel();
  }
}

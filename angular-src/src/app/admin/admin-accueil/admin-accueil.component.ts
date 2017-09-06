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
  };

  manageMessages() {
    this._adminAccueilService.setMessagesManagement();
  };
  showStatistics() {
    this._adminAccueilService.setStatistics()
  };
  ngOnInit() {
    this._adminAccueilService.setManagementPanel();
  }

  ngOnDestroy() {
    this._adminAccueilService.unsetManagementPanel();
  }
}

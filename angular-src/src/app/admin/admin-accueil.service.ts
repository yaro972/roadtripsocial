import { Injectable } from '@angular/core';

@Injectable()
export class AdminAccueilService {
  isUsermanagement: Boolean;
  isMessageManagement: Boolean;
  isStattistics: Boolean;

  isManagementPanel: Boolean;

  constructor() { }

  setManagementPanel() {
    this.isManagementPanel = true;
  }
  unsetManagementPanel() {
    this.isManagementPanel = true;
  }
  getManagementPanelStatus() {
    return this.isManagementPanel;
  }


  setUserManagement() {
    this.isUsermanagement = true;
    this.isStattistics = false;
    this.isMessageManagement = false;
  }
  setMessagesManagement() {
    this.isUsermanagement = false;
    this.isStattistics = false;
    this.isMessageManagement = true;
  }
  setStatistics() {
    this.isUsermanagement = false;
    this.isStattistics = true;
    this.isMessageManagement = false;
  }

  getUserManagement() {
    return this.isUsermanagement;
  }
  getMessagesManagement() {
    return this.isMessageManagement;
  }
  getStatistics() {
    return this.isStattistics;
  }


}

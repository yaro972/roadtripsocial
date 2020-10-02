import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {AdminService} from './admin/admin.service';

@Component({
  selector: 'rts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'Road Trip Social';
  adminStatus: Boolean;

  constructor(
    private _AdminService: AdminService
  ) { }

  ngOnInit() {
    this.adminStatus = this._AdminService.getManagementPanelStatus();
  }
  ngAfterContentChecked() {
    this.adminStatus = this._AdminService.getManagementPanelStatus();
  }
}

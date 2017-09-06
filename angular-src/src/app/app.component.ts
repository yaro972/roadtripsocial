import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminService } from './admin/admin.service';

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

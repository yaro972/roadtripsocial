import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminAccueilService } from './admin/admin-accueil.service';

@Component({
  selector: 'rts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'Road Trip Social';
  adminStatus: Boolean;
  constructor(
    private _AdminAccueilService: AdminAccueilService
  ) { }

  ngOnInit() {
    this.adminStatus = this._AdminAccueilService.getManagementPanelStatus();
  }
  ngAfterContentChecked() {
    this.adminStatus = this._AdminAccueilService.getManagementPanelStatus();
  }
}

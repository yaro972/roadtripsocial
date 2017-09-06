import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAccueilComponent } from './admin-accueil/admin-accueil.component';

import { AdminService } from './admin.service';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminMessagesComponent } from './admin-messages/admin-messages.component';
import { AdminStatisticsComponent } from './admin-statistics/admin-statistics.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AdminService
  ],
  declarations: [
    AdminAccueilComponent,
    AdminMenuComponent,
    AdminUsersComponent,
    AdminMessagesComponent,
    AdminStatisticsComponent
  ],
  exports: [
    // AdminAccueilService
  ]
})
export class AdminModule { }

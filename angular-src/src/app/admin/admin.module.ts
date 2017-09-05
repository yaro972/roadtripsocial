import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAccueilComponent } from './admin-accueil/admin-accueil.component';

import { AdminAccueilService } from './admin-accueil.service';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AdminAccueilService
  ],
  declarations: [
    AdminAccueilComponent,
    AdminMenuComponent
  ],
  exports: [
    // AdminAccueilService
  ]
})
export class AdminModule { }

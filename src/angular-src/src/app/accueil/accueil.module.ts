import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccueilComponent} from './accueil/accueil.component';

import {MembresModule} from '../membres/membres.module';
import {FeedsModule} from '../feeds/feeds.module';
import {PassSecurityModule} from '../pass-security/pass-security.module';
import {ProfileModule} from '../profile/profile.module';
import {AuthService} from '../services/auth/auth.service';


@NgModule({
  imports: [
    CommonModule,
    FeedsModule,
    MembresModule,
    PassSecurityModule,
    ProfileModule
  ],
  declarations: [
    AccueilComponent
  ],
  exports: [
    AccueilComponent
  ],
  providers: [
    AuthService
  ]
})
export class AccueilModule { }

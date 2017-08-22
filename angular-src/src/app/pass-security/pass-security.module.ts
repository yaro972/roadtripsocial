import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ResetPasswordComponent,
    ChangePasswordComponent
  ]
})
export class PassSecurityModule { }

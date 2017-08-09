import { AuthService } from './../../services/auth.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlashMessagesModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    AuthService
  ]
})

export class LoginModule { }

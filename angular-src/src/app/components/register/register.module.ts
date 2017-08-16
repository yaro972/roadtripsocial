import { AuthService } from './../../services/auth/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RegisterComponent } from './register.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { CivilityFormComponent } from '../civility-form/civility-form.component';
import { ExtraDetailsFormComponent } from '../extra-details-form/extra-details-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    RegisterComponent,
    RegistrationFormComponent,
    CivilityFormComponent,
    ExtraDetailsFormComponent
  ],
  exports: [RegisterComponent],
  providers: [
    AuthService
  ]
})

export class RegisterModule { }

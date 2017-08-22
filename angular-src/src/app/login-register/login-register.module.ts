import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { LoginModule } from './login/login.module';

import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { CivilityFormComponent } from './civility-form/civility-form.component';
import { ExtraDetailsFormComponent } from './extra-details-form/extra-details-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RegisterComponent,
    RegistrationFormComponent,
    CivilityFormComponent,
    ExtraDetailsFormComponent,
  ]
})
export class LoginRegisterModule { }

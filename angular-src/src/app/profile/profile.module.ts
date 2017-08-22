import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile/profile.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditService } from './../services/profile-edit/profile-edit.service';

import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { LastMessageViewComponent } from './last-message-view/last-message-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProfileComponent,
    ProfileViewComponent,
    ProfileEditComponent,
    LastMessageViewComponent
  ],
  providers: [
    ProfileEditService
  ]
})
export class ProfileModule { }

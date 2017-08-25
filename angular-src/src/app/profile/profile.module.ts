import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { LastMessageViewComponent } from './last-message-view/last-message-view.component';

import { ProfileEditService } from './../services/profile-edit/profile-edit.service';

import { FeedsModule } from './../feeds/feeds.module';
import { ShowImagesModule } from './../show-images/show-images.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShowImagesModule,
    FeedsModule
  ],
  declarations: [
    ProfileComponent,
    ProfileViewComponent,
    ProfileEditComponent,
    LastMessageViewComponent
  ],
  providers: [
    ProfileEditService,
    ProfileEditService
  ],
  exports: [
    ProfileViewComponent
  ]
})
export class ProfileModule { }

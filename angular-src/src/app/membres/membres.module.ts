import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileModule } from './../profile/profile.module';

import { DetailMembresComponent } from './detail-membres/detail-membres.component';
import { ListMembresComponent } from './list-membres/list-membres.component';
import { ListFriendsComponent } from './list-friends/list-friends.component';
import { ShowImagesModule } from './../show-images/show-images.module';
import { FeedsModule } from './../feeds/feeds.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    FormsModule,
    ReactiveFormsModule,
    FeedsModule,
    ShowImagesModule
  ],
  declarations: [
    DetailMembresComponent,
    ListMembresComponent,
    ListFriendsComponent
  ],
  exports: [
    ListMembresComponent,
    ListFriendsComponent
  ]
})
export class MembresModule { }

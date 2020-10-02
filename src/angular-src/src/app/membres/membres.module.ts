import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ProfileModule} from '../profile/profile.module';
import {ShowImagesModule} from '../show-images/show-images.module';

import {DetailMembresComponent} from './detail-membres/detail-membres.component';
import {ListMembresComponent} from './list-membres/list-membres.component';
import {PostViewComponent} from './post-view/post-view.component';


@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    FormsModule,
    ReactiveFormsModule,
    ShowImagesModule
  ],
  declarations: [
    DetailMembresComponent,
    ListMembresComponent,
    PostViewComponent
  ],
  exports: [
    DetailMembresComponent,
    ListMembresComponent
  ]
})
export class MembresModule { }

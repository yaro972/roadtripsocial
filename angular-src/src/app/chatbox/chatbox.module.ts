import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChatboxService } from './chatbox/chatbox.service';
import { ShowImagesModule } from './../show-images/show-images.module';

@NgModule({
  imports: [
    CommonModule,
    ShowImagesModule,
    FormsModule
  ],
  declarations: [
    ChatboxComponent
  ],
  providers: [
    ChatboxService
  ],
  exports: [
    ChatboxComponent
  ]
})
export class ChatboxModule { }

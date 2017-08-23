import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewComponent } from './post-view/post-view.component';
import { CommentComponent } from './comment/comment.component';
import { FromNowPipe } from './comment/from-now.pipe';
import { ShowImagesModule } from './../show-images/show-images.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SendMessageComponent } from './send-message/send-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShowImagesModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostViewComponent,
    CommentComponent,
    FromNowPipe,
    SendMessageComponent
  ],
  exports: [
    PostViewComponent,
    SendMessageComponent
  ]
})
export class PostsModule { }

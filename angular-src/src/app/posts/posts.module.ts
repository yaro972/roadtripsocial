import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewComponent } from './post-view/post-view.component';
import { CommentComponent } from './comment/comment.component';
import { FromNowPipe } from './comment/from-now.pipe';
import { ShowImagesModule } from './../show-images/show-images.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShowImagesModule
  ],
  declarations: [
    PostViewComponent,
    CommentComponent,
    FromNowPipe
  ],
  exports: [
    PostViewComponent
  ]
})
export class PostsModule { }

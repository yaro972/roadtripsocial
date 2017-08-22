import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewComponent } from './post-view/post-view.component';
import { CommentComponent } from './comment/comment.component';
import { FromNowPipe } from './comment/from-now.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PostViewComponent,
    CommentComponent,
    FromNowPipe
  ]
})
export class PostsModule { }

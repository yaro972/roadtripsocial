import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowImagePipe } from './pipes/show-image.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ShowImagePipe
  ],
  exports: [
    ShowImagePipe
  ]
})
export class ShowImagesModule { }

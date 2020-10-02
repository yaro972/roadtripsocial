import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagerieComponent} from './messagerie.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessagerieComponent],
  exports: [
    MessagerieComponent
  ]
})
export class MessagerieModule { }

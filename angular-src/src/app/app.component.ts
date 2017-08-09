import { Component } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'rts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Road Trip Social';
}

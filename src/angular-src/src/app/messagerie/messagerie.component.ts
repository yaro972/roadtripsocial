import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'rts-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {
  isRead: Boolean;
  constructor() { }

  ngOnInit() {
  }

}

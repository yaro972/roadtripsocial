import { Component, OnInit } from '@angular/core';
import { AdminAccueilService } from './../admin-accueil.service';

@Component({
  selector: 'rts-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent implements OnInit {

  constructor(
    private _adminAccueilService: AdminAccueilService
  ) { }

  ngOnInit() {
  }

}

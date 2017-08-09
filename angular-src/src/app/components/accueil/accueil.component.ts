import { Component, OnInit } from '@angular/core';

import { Users } from './users'


@Component({
  selector: 'rts-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  isConnected: Boolean;

  users: Users = {
    registered: 15,
    online: 7
  }

  journey: Number = 157;

  constructor() { }

  ngOnInit() {
    this.isConnected = false;

    // Si des elements sont présents mais erronés
    // => Vidage du localStorage

    if (localStorage.getItem('token') && localStorage.getItem('token') === '') {
      localStorage.clear();
    }

    if (localStorage.getItem('user') && localStorage.getItem('user') === '') {
      localStorage.clear();
    }

    if (localStorage.getItem('token')) {
      this.isConnected = true;
    }

  }

}

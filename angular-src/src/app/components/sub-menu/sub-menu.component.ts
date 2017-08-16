import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'rts-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {

  links = [
    {
      url: '/profile',
      text: 'Voir mon profil'
    },
    {
      url: '/change-password',
      text: 'Changer mon mot de passe'
    },
    {
      url: '/list-membres',
      text: 'Rechercher un ami'
    },
    {
      url: '',
      text: 'Se Déconnecter'
    }
  ]


  constructor() { }

  ngOnInit() {
  }

}

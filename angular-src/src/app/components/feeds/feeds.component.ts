import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'rts-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  userAvatar: String;
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


  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.userAvatar = 'http://localhost:3000/api/display-photo/' + JSON.parse(localStorage.getItem('user')).avatar;


  }

}

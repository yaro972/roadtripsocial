import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';


import { ListMembersService } from '../../services/list-members/list-members.service';
import { AuthService } from '../../services/auth/auth.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { ShowImagePipe } from './../../pipes/show-image.pipe';

@Component({
  selector: 'rts-list-membres',
  templateUrl: './list-membres.component.html',
  styleUrls: ['./list-membres.component.css']
})
export class ListMembresComponent implements OnInit, OnDestroy {

  subSearch: any;

  membersList: any[];
  isCountriesVisited: Boolean;
  searchInput: any;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _membersService: ListMembersService,
    private _fileService: FileUploadService
  ) { }

  ngOnInit() {

  }

  /**
   *  Afficahge de la fiche détaillée de l'utilisateur
   * @param id Id de l'utilisateur
   */
  onShowDetail(member) {
    this._router.navigate(['/details-membres', member._id]);
  }

  /**
   * Modification du statut de suivi de l'utilisateur
   * @param id Id de l'utilisateur
   */
  onFollow(member) {
    // member[member._id].followed = !member[member._id].followed;
    alert('Follow');
    return false;
  }
  /**
   * Envoi d'un message dans le chat publique
   * @param id Id de l'utilisateur
   */
  onSendMessage(member) {
    alert('Message - Chat');
    return false;
  }

  /**
   * Envoi d'un message Privé
   * @param id Id de la personne
   */
  onSendPrivateMessage(member) {
    alert('Message privé');
    return false;
  }

  /**
   * Fonction de recherche d'un élément
   * @param item Element à chercher
   */
  onSearchChange(item) {
    if (item.length >= 1) {

      this.subSearch = this._authService.searchMembers(item).subscribe(el => {
        if (el.err) {
          console.log(el.err)
        } else {
          console.log(el);

          this.membersList = el.membersList;
        }
      });
    } else {
      this.membersList = [];
    }
  }

  /**
   * destruction de la vue
   */
  ngOnDestroy() {
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
  }
}

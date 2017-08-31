import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';


import { ListMembersService } from '../../services/list-members/list-members.service';
import { AuthService } from '../../services/auth/auth.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { ShowImagePipe } from './../../show-images/pipes/show-image.pipe';

import { SendMessageService } from './../../feeds/service/send-message.service';

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
  ownId: String;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _membersService: ListMembersService,
    private _fileService: FileUploadService,
    private _sendMessageService: SendMessageService
  ) { }

  ngOnInit() {
    this.ownId = this._authService.getOwnId();
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
  onSendMessage(index) {
    alert('Message - Chat ' + index);
    return false;
  }

  /**
   * Envoi d'un message Privé
   * @param id Id de la personne
   */
  onSendPrivateMessage(index) {
    const receiver = this.membersList[index];

    this._sendMessageService.showMessagerie();
    this._sendMessageService.setReceiver(receiver);
    this._router.navigate(['/feeds']);

    return false;
  }

  /**
   * Fonction de recherche d'un élément
   * @param item Element à chercher
   */
  onSearchChange(item) {
    if (item.length >= 1) {

      this.subSearch = this._authService
        .searchMembers(item)
        .subscribe(el => {
          if (el.err) {
            console.log(el.err)
          } else {
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
      this.subSearch = null;
    }
  }
}

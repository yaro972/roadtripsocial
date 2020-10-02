import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {ListMembersService} from '../../services/list-members/list-members.service';
import {AuthService} from '../../services/auth/auth.service';
import {FileUploadService} from '../../services/file-upload/file-upload.service';

import {SendMessageService} from '../../feeds/service/send-message.service';
import {FlashMessagesService} from 'angular2-flash-messages';

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
  subAddFollow: Subscription;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _membersService: ListMembersService,
    private _fileService: FileUploadService,
    private _sendMessageService: SendMessageService,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.ownId = this._authService.getOwnId();
  }

  /**
   *  Affichage de la fiche détaillée de l'utilisateur
   * @param id Id de l'utilisateur
   */
  onShowDetail(member) {
    this._router.navigate(['/details-membres', member._id]);
  }



  /**
   * Envoi d'une demande d'ami
   * @param id Id de l'utilisateur
   */
  onFollow(member) {
    this.subAddFollow = this._authService
      .addFollow(this._authService.getOwnId(), member._id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this._flashMessage.show('Une demande d\'ami a été envoyée ', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          });
        }
      });
    return false;
  }

  /**
   * Suppression de la liste d'amis
   * @param member Id du membre
   */
  unfollow(member) { }
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
    if (this.subAddFollow) {
      this.subAddFollow.unsubscribe();
      this.subAddFollow = null;
    }
  }
}

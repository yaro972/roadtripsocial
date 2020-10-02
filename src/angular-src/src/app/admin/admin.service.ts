import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {environment} from '../../environments/environment';


@Injectable()
export class AdminService {
  isUsermanagement: Boolean;
  isMessageManagement: Boolean;
  isStatistics: Boolean;

  isManagementPanel: Boolean;

  authToken: any;

  constructor(
    private _http: Http
  ) { }

  setManagementPanel() {
    this.isManagementPanel = true;
  }
  unsetManagementPanel() {
    this.isManagementPanel = true;
  }
  getManagementPanelStatus() {
    return this.isManagementPanel;
  }

  setUserManagement() {
    this.isUsermanagement = true;
    this.isStatistics = false;
    this.isMessageManagement = false;
  }
  setMessagesManagement() {
    this.isUsermanagement = false;
    this.isStatistics = false;
    this.isMessageManagement = true;
  }
  setStatistics() {
    this.isUsermanagement = false;
    this.isStatistics = true;
    this.isMessageManagement = false;
  }

  getUserManagement() {
    return this.isUsermanagement;
  }
  getMessagesManagement() {
    return this.isMessageManagement;
  }
  getStatistics() {
    return this.isStatistics;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  getOwnId() {
    return JSON.parse(localStorage.getItem('user'))._id;
  }

  logout() {
    this.authToken = null;
    localStorage.clear();
  }

  /**
   * Récupère la liste des utilisateurs
   */
  getAllUsers() {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .get(environment.BACKENDURL + '/admin/all-users',
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
   * Bloque un utilisateur
   * @param userId Id de l'utilisateur
   */
  lockUser(userId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/admin/lock-user', {
        userId: userId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
   * Débloque un utilisateur
   * @param userId Id de l'utilisateur
   */
  unlockUser(userId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/admin/unlock-user', {
        userId: userId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }
  /**
   * Applique les droits d'administrateur
   * @param userId Id de l'utilisateur
   */
  passToAdmin(userId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/admin/pass-to-admin', {
        userId: userId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }


  /**
   * Supprime les droits d'administrateur
   * @param userId Id de l'utilisateur
   */
  setToMember(userId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/admin/set-to-member', {
        userId: userId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
   * Récupère tous les messages
   */
  getAllMessages() {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .get(environment.BACKENDURL + '/admin/get-all-messages',
      {
        headers: headers
      })
      .map(res => res.json());
  };

  /**
   * Récupère tous les commentaires
   */
  getAllComments() {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .get(environment.BACKENDURL + '/admin/get-all-comments',
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
   * Récupère tous les posts
   */
  getAllPosts() {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .get(environment.BACKENDURL + '/admin/get-all-posts',
      {
        headers: headers
      })
      .map(res => res.json());
  }


  /**
    * Supprime un message
    * @param commentId Id du message
    */
  deleteMessage(messageId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/admin/drop-message', {
        messageId: messageId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
    * Supprime un post
    * @param postId Id du post
  */
  deletePost(postId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/admin/drop-post', {
        postId: postId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
  * Supprime un commentaire
  * @param commentId Id du commentaire
  */
  deleteComment(commentId) {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .post(environment.BACKENDURL + '/admin/drop-comment', {
        commentId: commentId
      },
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
  * Nb messages chat
  */
  getNbChats() {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .get(environment.BACKENDURL + '/admin/chat-message',
      {
        headers: headers
      })
      .map(res => res.json());
  }

  /**
  * Nb messages
  */
  getNbMessages() {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .get(environment.BACKENDURL + '/admin/nb-messages',
      {
        headers: headers
      })
      .map(res => res.json());
  }
  /**
  * Nb mails
  */
  getNbMails() {
    const headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers
      .append('Content-type', 'application/json');
    return this._http
      .get(environment.BACKENDURL + '/admin/nb-mails',
      {
        headers: headers
      })
      .map(res => res.json());
  }
}

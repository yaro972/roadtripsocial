import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from './../admin.service';
import { Subscription } from 'rxjs/Subscription';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth/auth.service';
import { PostsService } from './../../services/posts/posts.service';

@Component({
  selector: 'rts-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit, OnDestroy {

  nbOnlineUsers: Number;
  nbUsers: Number;
  nbSendMails: Number;
  nbChatMessages: Number;
  nbMessages: Number;
  nbPosts: Number;
  nbComments: Number;

  // Souscription
  subGetOnlineUsers: Subscription;
  subGetNbUsers: Subscription;
  subGetNbPosts: Subscription;
  subGetNbComments: Subscription;
  subGetNbChats: Subscription;
  subGetNbMessages: Subscription;
  subGetNbMails: Subscription;

  constructor(
    private _adminService: AdminService,
    private _flashMessage: FlashMessagesService,
    private _authService: AuthService,
    private _postsService: PostsService
  ) { }

  reset() {
    this.nbOnlineUsers = 0;
    this.nbUsers = 0;
    this.nbSendMails = 0;
    this.nbChatMessages = 0;
    this.nbMessages = 0;
    this.nbPosts = 0;
    this.nbComments = 0;
  }

  /**
   * Nombre d'utilisateurs en ligne
   */
  getOnlineUsers() {
    this.subGetOnlineUsers = this._authService
      .getNbOnlineUsers()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.nbOnlineUsers = data.nbConnected;
        }
      });
  }

  /**
   * Nb utilisateurs inscrits
   */
  getNbUsers() {
    this.subGetNbUsers = this._authService
      .getNbUseregistred()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.nbUsers = data.nbRegistredUsers;
        }
      });
  }


  /**
   * Nb posts
   */
  getNbPosts() {
    this.subGetNbPosts = this._postsService
      .getPosts()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.nbPosts = data.posts.length;
        }
      });
  }

  /**
   * Nb Commentaires
   */
  getNbComments() {
    this.subGetNbComments = this._postsService
      .getNbComments()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.nbComments = data.nbComments;
        }
      });
  }

  /**
   * Nb messages Chats
   */
  getNbChat() {
    this.subGetNbChats = this._adminService
      .getNbChats()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.nbChatMessages = data.nbChatMsg;
        }
      });
  }

  /**
   * Nb messages
   */
  getNbMessages() {
    this.subGetNbMessages = this._adminService
      .getNbMessages()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.nbMessages = data.nbMessages;
        }
      });
  }

  /**
   * Nb messages
   */
  getNbMails() {
    this.subGetNbMails = this._adminService
      .getNbMails()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.nbSendMails = data.nbMails;
        }
      });
  }

  ngOnInit() {
    // this.reset();
    this.getOnlineUsers();
    this.getNbUsers();
    this.getNbPosts();
    this.getNbComments();
    this.getNbChat();
    this.getNbMessages();
    this.getNbMails();
  }

  ngOnDestroy() {
    if (this.subGetOnlineUsers) {
      this.subGetOnlineUsers.unsubscribe();
      this.subGetOnlineUsers = null;
    }
    if (this.subGetNbUsers) {
      this.subGetNbUsers.unsubscribe();
      this.subGetNbUsers = null;
    }
    if (this.subGetNbPosts) {
      this.subGetNbPosts.unsubscribe();
      this.subGetNbPosts = null;
    }
    if (this.subGetNbComments) {
      this.subGetNbComments.unsubscribe();
      this.subGetNbComments = null;
    }
    if (this.subGetNbChats) {
      this.subGetNbChats.unsubscribe();
      this.subGetNbChats = null;
    }
    if (this.subGetNbMessages) {
      this.subGetNbMessages.unsubscribe();
      this.subGetNbMessages = null;
    }
    if (this.subGetNbMails) {
      this.subGetNbMails.unsubscribe();
      this.subGetNbMails = null;
    }
  }
}

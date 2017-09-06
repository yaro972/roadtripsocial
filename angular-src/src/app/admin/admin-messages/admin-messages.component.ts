import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from './../admin.service';
import { Subscription } from 'rxjs/Subscription';
import { FlashMessagesService } from 'angular2-flash-messages';

import { JsonPipe } from '@angular/common';

@Component({
  selector: 'rts-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent implements OnInit, OnDestroy {

  messagesList = [];
  commentsList = [];
  postsList = [];

  subGetAllMessages: Subscription;
  subGetAllComments: Subscription;
  subGetAllPosts: Subscription;
  subDeleteMessage: Subscription;
  subDeletePost: Subscription;
  subDeleteComment: Subscription;

  constructor(
    private _adminService: AdminService,
    private _flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.messagesList.push('');
    this.getAllComments();
    this.getAllMessages();
    this.getAllPosts();
  }


  getAllMessages() {
    this.subGetAllMessages = this._adminService
      .getAllMessages()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.messagesList = data.messages;
        }
      });
  }

  getAllComments() {
    this.subGetAllComments = this._adminService
      .getAllComments()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.commentsList = data.comments;
        }
      });
  }
  getAllPosts() {
    this.subGetAllPosts = this._adminService
      .getAllPosts()
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.postsList = data.posts;
        }
      });
  }


  onDeleteMessage(indice) {
    this.subDeleteMessage = this._adminService
      .deleteMessage(this.messagesList[indice]._id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Le message a bien été supprimé', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          })
          this.getAllMessages();
        }
      });
  }
  onDeletePost(indice) {
    this.subDeletePost = this._adminService
      .deletePost(this.postsList[indice]._id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Le post a bien été supprimé', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          })
          this.getAllPosts();
          this.getAllComments();
        }
      });
  }
  onDeleteComment(indice) {
    this.subDeleteComment = this._adminService
      .deleteComment(this.commentsList[indice]._id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this._flashMessage.grayOut(true);
          this._flashMessage.show('Le commentaire a bien été supprimé', {
            cssClass: 'alert alert-success text-center',
            timeout: 2500
          })
          this.getAllComments();
        }
      });
  }



  ngOnDestroy() {
    if (this.subGetAllMessages) {
      this.subGetAllMessages.unsubscribe();
      this.subGetAllMessages = null;
    }
    if (this.subGetAllComments) {
      this.subGetAllComments.unsubscribe();
      this.subGetAllComments = null;
    }
    if (this.subGetAllPosts) {
      this.subGetAllPosts.unsubscribe();
      this.subGetAllPosts = null;
    }
    if (this.subDeleteMessage) {
      this.subDeleteMessage.unsubscribe();
      this.subDeleteMessage = null;
    }
    if (this.subDeletePost) {
      this.subDeletePost.unsubscribe();
      this.subDeletePost = null;
    }
    if (this.subDeleteComment) {
      this.subDeleteComment.unsubscribe();
      this.subDeleteComment = null;
    }
  }
}

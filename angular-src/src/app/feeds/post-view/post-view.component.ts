import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgModel } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { PostsService } from '../../services/posts/posts.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

import { ShowImagePipe } from './../../show-images/pipes/show-image.pipe';


import { JsonPipe } from '@angular/common';


@Component({
  selector: 'rts-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit, OnDestroy {
  @Input() ownerId: String;
  postItems: String[];
  commentShow: Boolean;
  newComment: String;
  sub: any;
  // commentList: any[];
  commentList: any;
  ownId: String;



  constructor(
    private _postsService: PostsService,
    private _fileService: FileUploadService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.ownId = this._authService.getOwnId();
    this.commentShow = false;
    if (this.ownerId) {
      this.showOwnerPosts(this.ownerId);
    } else {
      this.showPosts();
    }

    this.commentList = {};
  }

  /**
   * Affiche tous les posts
   */
  showPosts() {
    this._postsService.getPosts().subscribe(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.postItems = data.posts;
      }
    });
  };

  /**
  * Affiche tous les posts de l'utilisateur spécifié
  */
  showOwnerPosts(ownerId: String) {
    this._postsService.getOwnerPosts(ownerId).subscribe(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.postItems = data.posts;
      }
    });
  };

  onClickAddComment(id) {
    this.commentShow = id;
  }

  /**
   * Ajout d'un nouveau commentaire
   * @param postItemId Id du post commenté
   */
  addComment(postItemId) {
    const u = JSON.parse(localStorage.getItem('user'));

    const newCommentObj = {
      text: this.newComment,
      dateComment: new Date(),
      autorId: this._authService.getOwnId(),
      nickname: u.nickname,
      avatar: u.avatar,
      parent_id: postItemId
    };

    this.sub = this._postsService
      .addComment(newCommentObj)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.commentList = data.posts;
          this.newComment = '';
          this.showPosts();

        }
      });
  };

  /**
   * Suppression d'un post
   * @param id Id du post à supprimer
   */
  dropPost(id) {
    this._postsService
      .deletePost(id)
      .subscribe(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.postItems = data.posts;
          this.showPosts();
        }
      });
  }


  addResponse(id) {
    console.log('response', id);
  };

  /**
   * Nettoyage de la vue lors de la destruction
   */
  ngOnDestroy() {
    if (this.sub) {
      this.sub.subscribe();
      this.sub = null;
    }
  };
}

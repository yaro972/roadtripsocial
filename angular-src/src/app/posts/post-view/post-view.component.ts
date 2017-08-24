import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgModel } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { PostsService } from '../../services/posts/posts.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

import { ShowImagePipe } from './../../show-images/pipes/show-image.pipe';



@Component({
  selector: 'rts-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit, OnDestroy {
  @Input() owner: any;
  postItems: String[];
  commentShow: Boolean;
  newComment: String;
  sub: any;
  // commentList: any[];
  commentList: any;

  postItemList = [{
    id: 1,
    avatar: 'Anonymous.png',
    autor: 'J.Doe',
    // tslint:disable-next-line:max-line-length
    details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
    datePost: '01/08/2017',
    comments: [{
      id: 3,
      autor: 'G. America',
      avatar: 'Anonymous.png',
      // tslint:disable-next-line:max-line-length
      details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
      datePost: '02/08/2017'
    },
    {
      id: 4,
      autor: 'France',
      avatar: 'Anonymous.png',
      // tslint:disable-next-line:max-line-length
      details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
      datePost: '04/08/2017'
    },
    {
      id: 5,
      autor: 'Madininina',
      avatar: 'Anonymous.png',
      // tslint:disable-next-line:max-line-length
      details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
      datePost: '04/08/2017'
    },
    ]
  },
  {
    id: 2,
    avatar: 'Anonymous.png',
    autor: 'J.Doe1',
    // tslint:disable-next-line:max-line-length
    details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
    datePost: '01/08/2017',
    comments: [{
      id: 6,
      autor: 'G. America1',
      avatar: 'Anonymous.png',
      // tslint:disable-next-line:max-line-length
      details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
      datePost: '02/08/2017'
    },
    {
      id: 7,
      autor: 'France1',
      avatar: 'Anonymous.png',
      // tslint:disable-next-line:max-line-length
      details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
      datePost: '04/08/2017'
    },
    {
      id: 8,
      autor: 'Madininina1',
      avatar: 'Anonymous.png',
      // tslint:disable-next-line:max-line-length
      details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
      datePost: '04/08/2017'
    },
    ]
  }
  ];

  constructor(
    private _postsService: PostsService,
    private _fileService: FileUploadService
  ) { }

  ngOnInit() {
    this.commentShow = false;
    this.showPosts();
    this.commentList = {};

  }

  /**
   * Affiche tous les posts
   */
  showPosts(author?: any) {
    this._postsService.getPosts().subscribe(data => {
      // debugger
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
      autorId: u._id,
      parent_id: postItemId
    };

    this.sub = this._postsService.addComment(newCommentObj).subscribe(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        console.log(data);
        // this.showPosts();
        // this.commentList.push(data.posts);
        this.commentList = data.posts;
      }
    });
  };

  /**
   * Suppression d'un post
   * @param id Id du post à supprimer
   */
  dropPost(id) {
    this._postsService.deletePost(id).subscribe(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.postItems = data.posts;
        console.log(data);
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
    }
  };
}

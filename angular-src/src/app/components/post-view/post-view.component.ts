import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgClass } from '@angular/common';

import { AuthService } from '../../services/auth/auth.service';
import { PostsService } from '../../services/posts/posts.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

import { ShowImagePipe } from './../../pipes/show-image.pipe';

@Component({
  selector: 'rts-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit, OnDestroy {
  @Input() owner: any;
  postItems: String[];
  commentShow: Boolean;

  // postItems = [{
  //   id: 1,
  //   avatar: 'Anonymous.png',
  //   autor: 'J.Doe',
  //   details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
  //   datePost: '01/08/2017',
  //   comments: [
  //     {
  //       id: 3,
  //       autor: 'G. America',
  //       avatar: 'Anonymous.png',
  //       details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
  //       datePost: '02/08/2017'
  //     },
  //     {
  //       id: 4,
  //       autor: 'France',
  //       avatar: 'Anonymous.png',
  //       details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
  //       datePost: '04/08/2017'
  //     },
  //     {
  //       id: 5,
  //       autor: 'Madininina',
  //       avatar: 'Anonymous.png',
  //       details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
  //       datePost: '04/08/2017'
  //     },
  //   ]
  // },
  // {
  //   id: 2,
  //   avatar: 'Anonymous.png',
  //   autor: 'J.Doe1',
  //   details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
  //   datePost: '01/08/2017',
  //   comments: [
  //     {
  //       id: 6,
  //       autor: 'G. America1',
  //       avatar: 'Anonymous.png',
  //       details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
  //       datePost: '02/08/2017'
  //     },
  //     {
  //       id: 7,
  //       autor: 'France1',
  //       avatar: 'Anonymous.png',
  //       details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
  //       datePost: '04/08/2017'
  //     },
  //     {
  //       id: 8,
  //       autor: 'Madininina1',
  //       avatar: 'Anonymous.png',
  //       details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
  //       datePost: '04/08/2017'
  //     },
  //   ]
  // }
  // ];


  constructor(
    private _postsService: PostsService,
    private _fileService: FileUploadService
  ) { }

  ngOnInit() {
    this.commentShow = false;
    this.showPosts();
  }

  /**
   * Affiche tous les posts
   */
  showPosts(author?: any) {
    this._postsService.getPosts().subscribe(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.postItems = data.posts;
      }
    });
  };


  onClickAddComment(id) {
    console.log('comment', id);
    this.commentShow = id;
  }

  addComment(postItemId) {

  }

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
  }

  ngOnDestroy() {

  }
}

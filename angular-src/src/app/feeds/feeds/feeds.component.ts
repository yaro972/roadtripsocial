import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { PostsService } from '../../services/posts/posts.service';
import { environment } from './../../../environments/environment';
import { SendMessageService } from './../service/send-message.service';

@Component({
  selector: 'rts-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit, OnDestroy, AfterContentChecked {
  userAvatar: String;
  newPost: String;
  sub: any;
  subSendMessageService: any;

  showFormEvent: Boolean;
  isMessagerieShown: any;
  friendName: String;


  constructor(
    private _authService: AuthService,
    private _postService: PostsService,
    private _sendMessageService: SendMessageService
  ) {

  }

  ngOnInit() {
    this.userAvatar = environment.BACKENDURL + '/api/display-photo/' + JSON.parse(localStorage.getItem('user')).avatar;


  }

  // Ajout d'un post
  addPost() {
    const userElem = JSON.parse(localStorage.getItem('user'));

    const newPostObject = {
      datePost: new Date,
      details: this.newPost,
      autorId: userElem._id,
      commentTo: null
    }

    this.sub = this._postService.sendNewPost(newPostObject).subscribe(data => {
      if (data.err) {
        console.log(data.err)
      } else {

      }
    });
  };

  /**
   * Active la vue du formulaire
   */
  onShowForm() {
    console.log(1, '-', new Date())
    this.showFormEvent = true;
  }

  onSendMessage() {
    this.showFormEvent = false;
  }



  ngAfterContentChecked() {
    this.subSendMessageService = this._sendMessageService.isShown()
      .subscribe(status => {
        this.isMessagerieShown = status;
      });


  }


  /**
   * Nettoyage lors de la destruction de la vue
   */
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }

    if (this.subSendMessageService) {
      this.subSendMessageService.unsubscribe();
      this.subSendMessageService = null;
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ChatboxService } from './chatbox.service';

@Component({
  selector: 'rts-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, OnDestroy {
  listMessages = [];
  connection: any;
  currentMessage: String;

  constructor(private _chatboxService: ChatboxService) { }

  ngOnInit() {
    this.connection = this._chatboxService.getMsg()
      .subscribe(msg => {
        this.listMessages.push(msg);
      });
  }

  onSendMessage() {
    this._chatboxService.sendMsg(this.currentMessage)
    this.currentMessage = '';
  }


  ngOnDestroy() {
    if (this.connection) {
      this.connection.unsubscribe()
      this.connection = null;
    }
  }


}

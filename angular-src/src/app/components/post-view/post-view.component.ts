import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'rts-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  postItems = [{
    id: 1,
    avatar: 'Anonymous.png',
    autor: 'J.Doe',
    details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
    datePost: '01/08/2017',
    comments: [
      {
        id: 3,
        autor: 'G. America',
        avatar: 'Anonymous.png',
        details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
        datePost: '02/08/2017'
      },
      {
        id: 4,
        autor: 'France',
        avatar: 'Anonymous.png',
        details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
        datePost: '04/08/2017'
      },
      {
        id: 5,
        autor: 'Madininina',
        avatar: 'Anonymous.png',
        details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
        datePost: '04/08/2017'
      },
    ]
  },
  {
    id: 2,
    avatar: 'Anonymous.png',
    autor: 'J.Doe1',
    details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
    datePost: '01/08/2017',
    comments: [
      {
        id: 6,
        autor: 'G. America1',
        avatar: 'Anonymous.png',
        details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
        datePost: '02/08/2017'
      },
      {
        id: 7,
        autor: 'France1',
        avatar: 'Anonymous.png',
        details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
        datePost: '04/08/2017'
      },
      {
        id: 8,
        autor: 'Madininina1',
        avatar: 'Anonymous.png',
        details: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi ',
        datePost: '04/08/2017'
      },
    ]
  },
  ];


  constructor() { }

  ngOnInit() {

  }

  addComment(id) {
    console.log('comment', id);
  }

  addResponse(id) {
    console.log('response', id);
  }

}

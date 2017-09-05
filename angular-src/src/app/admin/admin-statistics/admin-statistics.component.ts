import { Component, OnInit } from '@angular/core';
import { AdminAccueilService } from './../admin-accueil.service';

@Component({
  selector: 'rts-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {

  constructor(
    private _adminAccueilService: AdminAccueilService
  ) { }

  ngOnInit() {
  }

}

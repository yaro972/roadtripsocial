import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { Accueil } from './accueil/accueil.component';
import { ListMembres } from './listMembres/listMembres.component';
import { DetailsMembres } from './detailsMembres/detailsMembres.component';
import { Register } from './register/register.component';


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    AppComponent,
    Accueil
     ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

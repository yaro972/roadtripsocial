import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app-component';
import { topMenu } from './top-menu/topMenu-component';
import { footer } from './footer/footer-component';
import { Accueil } from './accueil/accueil.component';
import { ListMembres } from './listMembres/listMembres.component';
import { DetailsMembres } from './detailsMembres/detailsMembres.component';
//import { RtsService } from './rts.service;
import { Register } from './register/register.component';
import { routing } from './app.routes';


@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing 
    ],
  
  declarations: [ 
    AppComponent,
    topMenu,
    footer,
    Accueil,
    ListMembres,
    DetailsMembres,
    Register,
     ],
  //providers: [ RtsService ],
  
  bootstrap:    [ AppComponent ]
})
export class AppModule {  }

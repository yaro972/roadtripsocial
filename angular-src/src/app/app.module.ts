import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { AccueilComponent } from './components/accueil/accueil.component';
import { DetailMembresComponent } from './components/detail-membres/detail-membres.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { ListMembresComponent } from './components/list-membres/list-membres.component';


// Services
import { AuthService } from './services/auth/auth.service';
import { FileUploadService } from './services/file-upload/file-upload.service';

import { ListMembersService } from './services/list-members/list-members.service';

import { PostsService } from './services/posts/posts.service';

import { AuthGuard } from './guard/auth.guard';
import { CollapseModule } from 'ngx-bootstrap';

import { LoginRegisterModule } from './login-register/login-register.module';

import { PostsModule } from './posts/posts.module';



import { FeedsComponent } from './components/feeds/feeds.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { ListFriendsComponent } from './components/list-friends/list-friends.component';

import { ShowImagePipe } from './pipes/show-image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AccueilComponent,
    DetailMembresComponent,
    FooterComponent,
    TopMenuComponent,
    ListMembresComponent,
    FeedsComponent,
    SubMenuComponent,
    ListFriendsComponent,
    ShowImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    LoginRegisterModule,
    FlashMessagesModule,
    PostsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    FileUploadService,
    ListMembersService,
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

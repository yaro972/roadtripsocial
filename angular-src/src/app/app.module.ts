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

import { FooterComponent } from './components/footer/footer.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';



// Services
import { AuthService } from './services/auth/auth.service';
import { FileUploadService } from './services/file-upload/file-upload.service';

import { ListMembersService } from './services/list-members/list-members.service';

import { PostsService } from './services/posts/posts.service';

import { AuthGuard } from './guard/auth.guard';
import { CollapseModule } from 'ngx-bootstrap';


import { LoginRegisterModule } from './login-register/login-register.module';
import { MembresModule } from './membres/membres.module';
import { ProfileModule } from './profile/profile.module';
import { PassSecurityModule } from './pass-security/pass-security.module';
import { ShowImagesModule } from './show-images/show-images.module';
// import { MessagerieModule } from './messagerie/messagerie.module';
import { FeedsModule } from './feeds/feeds.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AccueilComponent,
    FooterComponent,
    TopMenuComponent
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
    ProfileModule,
    PassSecurityModule,
    ShowImagesModule,
    MembresModule,
    // MessagerieModule,
    FeedsModule
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

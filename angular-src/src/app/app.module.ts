import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReactiveFormsModule } from '@angular/forms';

import { AccueilComponent } from './components/accueil/accueil.component';
import { DetailMembresComponent } from './components/detail-membres/detail-membres.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { ListMembresComponent } from './components/list-membres/list-membres.component';

import { RegisterModule } from './components/register/register.module';
import { LoginModule } from './components/login/login.module';
import { ProfileComponent } from './components/profile/profile.component';
// Services
import { AuthService } from './services/auth/auth.service';
import { FileUploadService } from './services/file-upload/file-upload.service';

import { ListMembersService } from './services/list-members/list-members.service';

import { PostsService } from './services/posts/posts.service';

import { AuthGuard } from './guard/auth.guard';
import { CollapseModule } from 'ngx-bootstrap';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { CivilityFormComponent } from './components/civility-form/civility-form.component';
import { ExtraDetailsFormComponent } from './components/extra-details-form/extra-details-form.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { ProfileEditService } from './services/profile-edit/profile-edit.service';

import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { ListFriendsComponent } from './components/list-friends/list-friends.component';
import { LastMessageViewComponent } from './components/last-message-view/last-message-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AccueilComponent,
    DetailMembresComponent,
    FooterComponent,
    TopMenuComponent,
    ListMembresComponent,
    ProfileComponent,
    ProfileViewComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ProfileEditComponent,
    PostViewComponent,
    FeedsComponent,
    SubMenuComponent,
    ListFriendsComponent,
    LastMessageViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule,
    RegisterModule,
    FlashMessagesModule,

  ],
  providers: [
    AuthGuard,
    AuthService,
    FileUploadService,
    ProfileEditService,
    ListMembersService,
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

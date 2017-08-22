import { ProfileComponent } from './profile/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AccueilComponent } from './components/accueil/accueil.component';
import { ListMembresComponent } from './components/list-membres/list-membres.component';
import { DetailMembresComponent } from './components/detail-membres/detail-membres.component';
import { RegisterComponent } from './login-register/register/register.component';
import { LoginComponent } from './login-register/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FeedsComponent } from './components/feeds/feeds.component';

import { ResetPasswordComponent } from './pass-security/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pass-security/change-password/change-password.component';

import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    // redirectTo: '/accueil',
    // pathMatch: 'full'
    component: AccueilComponent
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'feeds',
    component: FeedsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-membres',
    component: ListMembresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'details-membres/:id',
    component: DetailMembresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    component: TopMenuComponent,
    outlet: 'top-menu'
  },
  {
    path: '',
    component: FooterComponent,
    outlet: 'footer'
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

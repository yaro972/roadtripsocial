import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Accueil } from './accueil/accueil.component';
import { ListMembres } from './listMembres/listMembres.component';
import { DetailsMembres } from './detailsMembres/detailsMembres.component';
import { Register } from './register/register.component';
import { Login } from './login/login-component';
import { About } from './about/about-component';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: Accueil },
  { path: 'list-membres', component: ListMembres },
  { path: 'details-membres', component: DetailsMembres },
  { path: 'register', component: Register },
   { path: 'login', component: Login },
  {path: 'about', component: About}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);


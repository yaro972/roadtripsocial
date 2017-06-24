import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Accueil } from './accueil/accueil.component';
import { ListMembres } from './listMembres/listMembres.component';
import { DetailsMembres } from './detailsMembres/detailsMembres.component';
import { Register } from './register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: Accueil },
  { path: 'list-membres', component: ListMembres },
  { path: 'details-membre', component: DetailsMembres },
  { path: 'register', component: Register }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);


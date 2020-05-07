import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/guard/auth-guard.service';

/**
 * Routes object containing all the app routes
 * @Module
 * @typedef {Object} Routes
 * @property {string} path - path URI to get the page
 * @property {component} component - component to load linked to the URI
 * @property {service} canActivate - service called to secure route
 */

/**
 * @type {Routes}
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

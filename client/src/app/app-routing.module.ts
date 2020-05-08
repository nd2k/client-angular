import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './shared/services/guard/auth-guard.service';
import { DefaultComponent } from './layouts/default/default.component';

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
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

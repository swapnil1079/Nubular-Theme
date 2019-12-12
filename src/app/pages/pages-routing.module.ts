import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthGuard} from '../core/@services/authGurad.service';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'dashboard',
    component: ECommerceComponent,
    canActivate: [AuthGuard]
  }, 
  // {
  //   path: 'iot-dashboard',
  //   component: DashboardComponent,canActivate: [AuthGuard]
  // }, 
  // {
  //   path: 'ui-features',
  //   loadChildren: './ui-features/ui-features.module#UiFeaturesModule',canActivate: [AuthGuard]
  // }, {
  //   path: 'modal-overlays',
  //   loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',canActivate: [AuthGuard]
  // }, {
  //   path: 'extra-components',
  //   loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',canActivate: [AuthGuard]
  // }, {
  //   path: 'bootstrap',
  //   loadChildren: './bootstrap/bootstrap.module#BootstrapModule',canActivate: [AuthGuard]
  // }, {
  //   path: 'maps',
  //   loadChildren: './maps/maps.module#MapsModule',canActivate: [AuthGuard]
  // }, {
  //   path: 'charts',
  //   loadChildren: './charts/charts.module#ChartsModule',canActivate: [AuthGuard]
  // }, {
  //   path: 'editors',
  //   loadChildren: './editors/editors.module#EditorsModule',canActivate: [AuthGuard]
  // }, {
  //   path: 'forms',
  //   loadChildren: './forms/forms.module#FormsModule',canActivate: [AuthGuard]
  // }, 
  {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',canActivate: [AuthGuard]
  }, 
  // {
  //   path: 'miscellaneous',
  //   loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',canActivate: [AuthGuard]
  // }, 
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

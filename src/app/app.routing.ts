import { Routes } from "@angular/router";
import { DashboardPageComponent } from "./pages/dashboard/dashboard-page.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'bookmarked-forms',
    title: 'Bookmarked Forms',
    loadComponent: () => import('./pages/bookmarked-forms/bookmarked-forms-page.component'),
  },
  {
    path: 'forms',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create',
      },
      {
        path: 'create',
        title: 'Create Form',
        loadComponent: () => import('./pages/form-create/form-create-page.component'),
      },
      {
        path: ':formId',
        loadComponent: () => import('./pages/form-details/form-details-page.component'),
      },
    ],
  },
];
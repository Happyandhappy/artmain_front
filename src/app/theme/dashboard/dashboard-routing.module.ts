import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      status: false
    },
    children: [      
      {
        path: '',
        loadChildren: './analytics/analytics.module#AnalyticsModule'
      },
      {
        path: 'superadmindash',
        loadChildren: './superadmin/superadmin.module#SuperAdminModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

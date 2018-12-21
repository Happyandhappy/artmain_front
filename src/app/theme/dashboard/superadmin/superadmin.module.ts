import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './superadmin.component';
import {AnalyticsRoutingModule} from './superadmin-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    SharedModule,
    ChartModule
  ],
  declarations: [AnalyticsComponent]
})
export class SuperAdminModule { }

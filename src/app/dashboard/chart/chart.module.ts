import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';

import { MatTabsModule } from '@angular/material/tabs'
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    MatTabsModule,
    MatSelectModule
  ]
})
export class ChartModule { }

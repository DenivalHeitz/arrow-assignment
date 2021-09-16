import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
      { path: 'table', loadChildren: () => import('./table/table.module').then(m => m.TableModule) },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

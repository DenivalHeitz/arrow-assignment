import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';

// angualar material modules
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class TableModule { }

import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DataService } from 'src/app/services/data.service'; 
import { Quake } from 'src/app/model/quake';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['source', 'magnitude', 'region', 'earthquake_id'];
  dataSource: MatTableDataSource<Quake>;

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource();
  }
  
  ngOnInit(): void {
    this.getQuakeData();
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getQuakeData(magnitude?:number): void {
    this.dataService.getQuakeData(magnitude)
      .subscribe(
        data => {
          this.dataSource.data = data;
          console.log(this.dataSource.data);
        },
        error => {
          console.log(error);
        }
      );
  }
}


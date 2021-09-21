import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Quake } from 'src/app/model/quake';
import { DataService } from 'src/app/services/data.service';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let dataService: DataService;
  let testQuakeData: Quake[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [DataService],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    testQuakeData = [{
      source: "us",
      earthquake_id: "usb000q6wt",
      magnitude: "6",
      depth: "54.18",
      region: "70km SSE of Namlea, Indonesia"
    }];

    fixture = TestBed.createComponent(TableComponent);
    dataService = TestBed.inject(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate earthquake data', (done) => {
    expect(component.dataSource.data).toEqual([]);

    let spy = spyOn(dataService, 'getQuakeData').and.returnValue(of(testQuakeData));

    component.ngOnInit();
    component.ngAfterViewInit()

    spy.calls.mostRecent().returnValue.subscribe(
      data => {
        expect(component.dataSource.data).toEqual(testQuakeData);
        done();
      }
    );
  });
});

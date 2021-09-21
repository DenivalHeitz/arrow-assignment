import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Vaccine } from 'src/app/model/vaccine';
import { DataService } from 'src/app/services/data.service';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let testVaccineData: Vaccine[];
  let dataService: DataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
      providers: [DataService],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    testVaccineData = [{
      stateCode: 'AL',
      stateName: 'Alabama',
      juneVax: 123456,
      julyVax: 654321
    }];

    fixture = TestBed.createComponent(ChartComponent);
    dataService = TestBed.inject(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#initVaccineData() should init stateCodes, stateNames, currentJuneTotal, currentJulyTotal', (done) => { 
    expect(component.vaccineData).toBeUndefined();
    let spy = spyOn(dataService, 'getAllVaccineData').and.returnValue(of(testVaccineData));

    component.ngOnInit();
    component.ngAfterViewInit()

    spy.calls.mostRecent().returnValue.subscribe(
      data => {
        expect(component.vaccineData).toEqual(testVaccineData);
        done();
      }
    );
  });
});

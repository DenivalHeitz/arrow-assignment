import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { Vaccine } from '../model/vaccine';

describe('DataService', () => {
  let httpTestingController: HttpTestingController;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(DataService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getVaccineData(MA) should return massachusetts data', (done) => {
    const expectedData: Vaccine = {
      stateName: "Massachusetts",
      stateCode: "MA",
      juneVax: 971818,
      julyVax: 368594
    };

    service.getVaccineData('MA').subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne('http://localhost:8080/api/vaccines/MA');
    testRequest.flush(expectedData);
  });

  it('#getQuakeData(6) should return quake magnitude=6 data', (done) => {
    const expectedData = [{
      source: "us",
      earthquake_id: "usb000qqlq",
      magnitude: "6",
      depth: "24.48",
      region: "113km NE of Grande Anse, Guadeloupe",
      location: {
        type: "Point",
        coordinates: [
          -60.3898,
          17.0865
        ]
      }
    }];

    service.getQuakeData(6).subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne('http://localhost:8080/api/quakes/6');
    testRequest.flush(expectedData);
  });
});

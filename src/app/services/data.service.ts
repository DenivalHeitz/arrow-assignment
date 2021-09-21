import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Quake } from '../model/quake';
import { Vaccine } from '../model/vaccine';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllVaccineData(): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(`${baseUrl}/api/vaccines`);
  }

  getVaccineData(stateCode: string): Observable<Vaccine> {
    return this.http.get<Vaccine>(`${baseUrl}/api/vaccines/${stateCode}`);
  }

  getQuakeData(magnitude?: number): Observable<Quake[]> {

    if (magnitude) {
      return this.http.get<Quake[]>(`${baseUrl}/api/quakes/${magnitude}`);
    }

    return this.http.get<Quake[]>(`${baseUrl}/api/quakes`);
  }

}

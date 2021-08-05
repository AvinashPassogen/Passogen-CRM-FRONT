import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { State } from './state';
import { Country } from './country';
import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080';

  stateByCountryId = '/state/all?countryId=';

  countries = '/country/all';

  cityByStateId = '/city/all?stateId=';

  
  constructor(private httpClient: HttpClient) {
  }

  getCityByStateId(stateId: number): Observable<City[]> {
    return this.httpClient.get<City[]>(environment.resourceUrl + this.cityByStateId + stateId);
  }

  getState(data){
    return this.httpClient.get<State[]>(environment.resourceUrl + this.stateByCountryId + data);
   }

  getStateByCountryId(countryId: number): Observable<State[]> {
    return this.httpClient.get<State[]>(environment.resourceUrl + this.stateByCountryId + countryId);
  }

  getAllCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.baseUrl}/country/all`);
  }
}

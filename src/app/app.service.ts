import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Chart } from './models/Chart';

@Injectable({
    providedIn: 'root'
  })
  export class AppService {
  
    constructor(private http: HttpClient) { }
    private apiEndpoint = 'https://localhost:7255/api/Home/GetGaugeConfigurations';

  
    // API calls will go here
    getData(): Observable<Chart[]> {
        return this.http.get<Chart[]>(`${this.apiEndpoint}`)
            .pipe(map(data => {
                return data;
            }));;
      }      
  
  }
  
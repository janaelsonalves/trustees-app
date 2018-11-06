import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrusteesApiService {

  private apiUrl = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=xml&sole';
  //private apiUrl = '../../assets/trustees_pacifico.xml';

  constructor(private http: HttpClient) { }

  getTrustees() {
    return this.http.get(`${this.apiUrl}`, { responseType: 'text' });
  }
}

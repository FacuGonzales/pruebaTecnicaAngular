import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharactersList(name: string = '', status: string = '', page: number = 1): Observable<any> {
    let params = new HttpParams();

    if (name) params = params.set('name', name);

    if (status) params = params.set('status', status);

    params = params.set('page', page.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }

}

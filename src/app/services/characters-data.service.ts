import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../models/episode-model';
import { Residents } from '../models/residents-model';
import { Character } from '../models/character-model';

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


  getEpisodes(api: string): Observable<Episode> {
    return this.http.get<Episode>(api);
  }

  getResidents(api: string): Observable<Residents> {
    return this.http.get<Residents>(api);
  }


  getCharacterByUrl(api: string): Observable<Character> {
    return this.http.get<Character>(api);
  }
}

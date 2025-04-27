import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

import { GET_CHARACTER_DETAILS } from '../constants/querys.constants';
import { CharacterDetails } from '../models/character-detail-model';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getCharactersList(name: string = '', status: string = '', page: number = 1): Observable<any> {
    let params = new HttpParams();

    if (name) params = params.set('name', name);

    if (status) params = params.set('status', status);

    params = params.set('page', page.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }

  getCharacterDetails(characterId: number): Observable<ApolloQueryResult<CharacterDetails>> {
    return this.apollo.watchQuery<CharacterDetails>({
      query: GET_CHARACTER_DETAILS,
      variables: { id: characterId },
    }).valueChanges;
  }
}

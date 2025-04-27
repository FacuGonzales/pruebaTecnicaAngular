import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApolloQueryResult } from '@apollo/client/core';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import { Character } from '../../models/character-model';
import { CharactersDataService } from '../../services/characters-data.service';
import { CharacterDetails } from '../../models/character-detail-model';

@Component({
  selector: 'app-detail-character',
  imports: [CommonModule, TranslateModule, MatCardModule, MatListModule, MatDividerModule],
  templateUrl: './detail-character.component.html',
  styleUrl: './detail-character.component.scss'
})
export class DetailCharacterComponent {
  private translate = inject(TranslateService);
  @Input() character!: Character;

  characterDetails$!: Observable<ApolloQueryResult<CharacterDetails> | null>;

  constructor(private characterService: CharactersDataService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character']) {
      if (this.character) {
        this.loadCharacterDetails(this.character.id);
      }
    }
  }

  loadCharacterDetails(characterId: number): void {
    this.characterDetails$ = this.characterService.getCharacterDetails(characterId).pipe(
      catchError(() => of(null))
    );
  }
}

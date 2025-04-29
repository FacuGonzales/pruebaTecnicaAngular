import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApolloQueryResult } from '@apollo/client/core';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import { Character } from '../../models/character-model';
import { CharactersDataService } from '../../services/characters-data.service';
import { CharacterDetails } from '../../models/character-detail-model';
import { MatIconModule } from '@angular/material/icon';
import { LoadingService } from '../../services/loading.service';
import { LoaderComponent } from '../loader/loader.component';
import { ResidentsListComponent } from '../residents-list/residents-list.component';

@Component({
  selector: 'app-detail-character',
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    LoaderComponent,
    ResidentsListComponent
  ],
  templateUrl: './detail-character.component.html',
  styleUrl: './detail-character.component.scss'
})
export class DetailCharacterComponent {
  private translate = inject(TranslateService);
  @Input() character!: Character;
  @Output() closeDetail: EventEmitter<boolean> = new EventEmitter();

  private loaderService = inject(LoadingService)
  loader$!: Observable<any>;
  characterDetails$!: Observable<ApolloQueryResult<CharacterDetails> | null>;

  constructor(private characterService: CharactersDataService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.loader$ = this.loaderService.loading$;
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

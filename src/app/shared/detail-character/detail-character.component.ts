import { Component, inject, Input, SimpleChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

import { Character } from '../../models/character-model';
import { CharactersDataService } from '../../services/characters-data.service';
import { catchError, Observable, of } from 'rxjs';
import { Episode } from '../../models/episode-model';
import { CommonModule } from '@angular/common';
import { Residents } from '../../models/residents-model';

@Component({
  selector: 'app-detail-character',
  imports: [CommonModule, MatCardModule],
  templateUrl: './detail-character.component.html',
  styleUrl: './detail-character.component.scss'
})
export class DetailCharacterComponent {
  // private characterService = inject(CharactersDataService);
  @Input() character!: Character;

  episodes$!: Observable<Episode>;

  residentsOrigin: Character[] = [];
  residentsLocation: Character[] = [];


  constructor(private characterService: CharactersDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character']) {
      this.episodes$ = this.characterService.getEpisodes(this.character.episode[0]);
      this.getResidentsOrigin();
      this.getResidentsLocation();
    }
  }

  getResidentsOrigin(): void {
    if (this.character.origin?.url) {
      return this.loadResidents(this.character.origin.url, true, false);
    }
  }

  getResidentsLocation(): void {
    if (this.character.location?.url) {
      return this.loadResidents(this.character.location.url, false, true);
    }
  }


  loadResidents(url: string, origin: boolean, location: boolean): void {
    this.characterService.getResidents(url)
    .pipe(catchError(() => of(null)))
    .subscribe(data => {
      if (data?.residents && data.residents.length > 0) {

        // LIMITAMOS a máximo 5 residentes
        const maxResidents = data.residents.slice(0, 5);

        maxResidents.forEach(_url => {
          this.characterService.getCharacterByUrl(_url)
            .pipe(catchError(() => of(null)))
            .subscribe(resident => {
              if (resident) {
                if(origin) this.residentsOrigin.push(resident);

                if(location) this.residentsLocation.push(resident);
              }
            });
        });
      }
    })
  }

}

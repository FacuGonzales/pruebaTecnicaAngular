import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { Character } from '../../models/character-model';

@Component({
  selector: 'app-accountants',
  imports: [CommonModule, TranslateModule, MatCardModule],
  templateUrl: './accountants.component.html',
  styleUrl: './accountants.component.scss'
})
export class AccountantsComponent {
  @Input() characters: Character[] = [];
  private translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  speciesCount: Record<string, number> = {};
  typeCount: Record<string, number> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characters']) {
      this.loadSpeciesAndTypeCounts();
    }
  }

  loadSpeciesAndTypeCounts(): void {
    this.speciesCount = {};
    this.typeCount = {};

    this.characters.forEach(character => {
      if (character.species) {
        this.speciesCount[character.species] = (this.speciesCount[character.species] || 0) + 1;
      }

      if (character.type) {
        this.typeCount[character.type] = (this.typeCount[character.type] || 0) + 1;
      }
    });
  }
}

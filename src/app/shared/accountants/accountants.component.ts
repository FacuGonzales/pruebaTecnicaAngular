import { Component, Input, SimpleChanges } from '@angular/core';
import { Character } from '../../models/character-model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-accountants',
  imports: [CommonModule, MatCardModule],
  templateUrl: './accountants.component.html',
  styleUrl: './accountants.component.scss'
})
export class AccountantsComponent {
  @Input() characters: Character[] = [];

  speciesCount: Record<string, number> = {}; // Para contar por species
  typeCount: Record<string, number> = {}; // Para contar por type

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characters']) {
      this.loadSpeciesAndTypeCounts();
    }
  }

  loadSpeciesAndTypeCounts(): void {
    // Reseteamos los contadores
    this.speciesCount = {};
    this.typeCount = {};

    this.characters.forEach(character => {
      // Contamos por species
      if (character.species) {
        this.speciesCount[character.species] = (this.speciesCount[character.species] || 0) + 1;
      }

      // Contamos por type (si es que tiene tipo)
      if (character.type) {
        this.typeCount[character.type] = (this.typeCount[character.type] || 0) + 1;
      }
    });
  }
}

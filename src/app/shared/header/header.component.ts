import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { FavoriteStore } from '../../stores/favorite.store';
import { Character } from '../../models/character-model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatBadgeModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() viewDetailCharacter = new EventEmitter<Character>();

  private translate = inject(TranslateService);
  private favoriteStore = inject(FavoriteStore);
  favorites$ = this.favoriteStore.favorites$;

  constructor() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  viewDetail(character: Character): void {
    this.viewDetailCharacter.emit(character)
  }
}

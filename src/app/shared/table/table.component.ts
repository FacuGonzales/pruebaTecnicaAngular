import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Character } from '../../models/character-model';
import { FindersComponent } from '../finders/finders.component';
import { FavoriteStore } from '../../stores/favorite.store';
import { AccountantsComponent } from '../accountants/accountants.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    FindersComponent,
    AccountantsComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent  implements OnChanges {
  private translate = inject(TranslateService);
  @Input() dataSource: Character[] = [];
  @Input() totalResults: number = 0;
  @Input() cleanItemSelected: boolean = false;
  @Output() sendFilterName = new EventEmitter();
  @Output() sendFilterStatus = new EventEmitter();
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @Output() detailCharacter = new EventEmitter<Character>();

  private favoriteStore = inject(FavoriteStore);

  itemSelected!: Character | null;
  displayedColumns: string[] = ['favorite', 'name', 'status', 'species', 'type', 'gender', 'created'];
  dataSourceTable = new MatTableDataSource<Character>([]);
  pageSize: number = 20;


  constructor() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.dataSourceTable.data = this.dataSource;
    }

    if(changes['cleanItemSelected'] && this.cleanItemSelected) {
      this.itemSelected = null;
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageChanged.emit(event);
  }

  viewItem(character: Character): void {
    this.itemSelected = character;
    this.detailCharacter.emit(character);
  }

  onSelectFavorite(character: Character) {
    this.favoriteStore.toggleFavorite(character);
  }

  isFavorite(character: Character): boolean {
    let isFav = false;
    this.favoriteStore.favorites$.subscribe(favorites => {
      isFav = favorites.some((fav: Character) => fav.id === character.id);
    });
    return isFav;
  }

}

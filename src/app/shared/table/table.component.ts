import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Character } from '../../models/character-model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent  implements OnChanges {
  private translate = inject(TranslateService);
  @Input() dataSource: Character[] = [];
  @Input() totalResults: number = 0;

  @Output() pageChanged = new EventEmitter<PageEvent>();
  @Output() detailCharacter = new EventEmitter<Character>();

  displayedColumns: string[] = ['name', 'status', 'species', 'created'];
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
  }

  onPageChange(event: PageEvent): void {
    this.pageChanged.emit(event);
  }

  viewItem(character: Character): void {
    this.detailCharacter.emit(character);
  }
}

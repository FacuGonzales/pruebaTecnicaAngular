import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TableComponent } from '../shared/table/table.component';
import { catchError, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CharactersDataService } from '../services/characters-data.service';
import { FormsModule } from '@angular/forms';
import { Character } from '../models/character-model';
import { PageEvent } from '@angular/material/paginator';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { DetailCharacterComponent } from '../shared/detail-character/detail-character.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule,
    TranslateModule, HeaderComponent, TableComponent, FormsModule, ErrorMessageComponent, DetailCharacterComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {
  nameFilter: string = '';
  statusFilter: string = '';
  currentPage: number = 1;
  totalResults = 0;
  private destroy$: Subject<any> = new Subject<void>();
  listado: Character[] = [];
  characterSelected: Character | null = null;

  constructor(private characterService: CharactersDataService) {
    this.search();
  }

  filterByName(data: string) {
    this.nameFilter = data;
    this.search();
  }

  filterByStatus(data: string) {
    this.statusFilter = data;
    this.search();
  }

  search(): void {
    this.characterSelected = null;
    this.characterService.getCharactersList(this.nameFilter, this.statusFilter, this.currentPage)
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged(),
        catchError((err) => {
          this.totalResults = 0;
          return this.listado = []
        })
      )
      .subscribe({
        next: (data) => {
          if(data.results) {
            this.totalResults = data.info.count;
            this.listado = data.results
          }
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.search();
  }

  onViewDetailCharacter(character: Character): void {
    this.characterSelected = character;
  }
}

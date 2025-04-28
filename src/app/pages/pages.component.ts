import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TableComponent } from '../shared/table/table.component';
import { catchError, debounceTime, distinctUntilChanged, Observable, Subject, takeUntil, EMPTY } from 'rxjs';
import { CharactersDataService } from '../services/characters-data.service';
import { FormsModule } from '@angular/forms';
import { Character } from '../models/character-model';
import { PageEvent } from '@angular/material/paginator';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { DetailCharacterComponent } from '../shared/detail-character/detail-character.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeaderComponent,
    TableComponent,
    FormsModule,
    ErrorMessageComponent,
    DetailCharacterComponent,
    LoaderComponent
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnDestroy {
  nameFilter: string = '';
  statusFilter: string = '';
  currentPage: number = 1;
  totalResults: number = 0;
  charactersList: Character[] = [];
  characterSelected: Character | null = null;
  cleanCharacterSelected!: boolean;
  loader$: Observable<any>;

  private destroy$ = new Subject<void>();
  private nameFilterSubject = new Subject<string>();
  private translate = inject(TranslateService);
  private loaderService = inject(LoadingService);

  constructor(private characterService: CharactersDataService) {
    this.loader$ = this.loaderService.loading$;
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.listenToNameFilter();
    this.searchCharacters();
  }

  filterByName(name: string): void {
    this.nameFilterSubject.next(name);
  }

  filterByStatus(status: string): void {
    this.statusFilter = status;
    this.searchCharacters();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.searchCharacters();
  }

  onViewDetailCharacter(character: Character): void {
    this.characterSelected = character;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenToNameFilter(): void {
    this.nameFilterSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(name => {
        this.nameFilter = name;
        this.searchCharacters();
      });
  }

  searchCharacters(): void {
    this.resetSelection();
    this.showLoader();
    const page = this.nameFilter ? 1 : this.currentPage;

    this.characterService.getCharactersList(this.nameFilter, this.statusFilter, page)
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.handleSearchError();
          return EMPTY;
        })
      )
      .subscribe(data => this.handleSearchSuccess(data));
  }

  private resetSelection(): void {
    this.characterSelected = null;
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  private handleSearchSuccess(data: any): void {
    this.totalResults = data.info?.count || 0;
    this.charactersList = data.results || [];
    this.hideLoader();
  }

  private handleSearchError(): void {
    this.totalResults = 0;
    this.charactersList = [];
    this.hideLoader();
  }
}

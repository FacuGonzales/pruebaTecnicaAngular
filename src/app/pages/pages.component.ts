import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TableComponent } from '../shared/table/table.component';
import { catchError, debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
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
export class PagesComponent {
  nameFilter: string = '';
  statusFilter: string = '';
  currentPage: number = 1;
  totalResults = 0;
  charactersList: Character[] = [];
  characterSelected: Character | null = null;
  cleanCharacterSelected!: boolean;
  private destroy$: Subject<any> = new Subject<void>();
  private translate = inject(TranslateService);
  private nameFilterSubject = new Subject<string>();
  private loaderService = inject(LoadingService)
  loader$!: Observable<any>;

  constructor(private characterService: CharactersDataService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.loader$ = this.loaderService.loading$;
    this.nameFilterSubject
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    )
    .subscribe((name) => {
      this.nameFilter = name;
      this.search();
    });

    this.search();
  }

  filterByName(data: string) {
    this.nameFilterSubject.next(data);
  }

  filterByStatus(data: string) {
    this.statusFilter = data;
    this.search();
  }

  search(): void {
    this.characterSelected = null;
    this.loaderService.show();

    this.characterService.getCharactersList(this.nameFilter, this.statusFilter, this.currentPage)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          this.totalResults = 0;
          this.charactersList = [];
          this.loaderService.hide();
          return [];
        })
      )
      .subscribe({
        next: (data) => {
          this.totalResults = data.info?.count || 0;
          this.charactersList = data.results || [];
          this.loaderService.hide();
        },
        error: () => {
          this.loaderService.hide();
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

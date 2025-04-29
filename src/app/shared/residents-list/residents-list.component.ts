import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ApolloQueryResult } from '@apollo/client/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CharacterDetails } from '../../models/character-detail-model';

@Component({
  selector: 'app-residents-list',
  imports: [CommonModule, TranslateModule, MatListModule],
  templateUrl: './residents-list.component.html',
  styleUrl: './residents-list.component.scss'
})
export class ResidentsListComponent {
  private translate = inject(TranslateService);
  @Input() resident!: any;

  constructor() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
}

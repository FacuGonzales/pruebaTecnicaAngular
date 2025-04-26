import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input-status-filter',
  imports:[
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './input-status-filter.component.html',
  styleUrl: './input-status-filter.component.scss'
})
export class InputStatusFilterComponent {
  private translate = inject(TranslateService);

  @Output() filterStatus: EventEmitter<any> = new EventEmitter();
  selected = new FormControl('');

  constructor() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');

    this.selected.valueChanges.subscribe(filter => {
      this.filterStatus.emit(filter)
    })
  }

}

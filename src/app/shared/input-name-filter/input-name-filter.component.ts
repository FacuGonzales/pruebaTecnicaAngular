import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input-name-filter',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,],
  templateUrl: './input-name-filter.component.html',
  styleUrl: './input-name-filter.component.scss'
})
export class InputNameFilterComponent {
  private translate = inject(TranslateService);

  @Output() filterName: EventEmitter<any> = new EventEmitter();
  name = new FormControl('');

  constructor() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');

    this.name.valueChanges.subscribe(filter => {
      this.filterName.emit(filter)
    })
  }
}

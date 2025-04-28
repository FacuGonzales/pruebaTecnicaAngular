import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  private translate = inject(TranslateService);
  @Output() backToSearch: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
}
